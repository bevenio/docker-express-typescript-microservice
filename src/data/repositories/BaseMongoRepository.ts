import {
  AnyBulkWriteOperation,
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  MatchKeysAndValues,
  OptionalId,
  OptionalUnlessRequiredId,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb'

import { DatabaseConnector } from '@/common/database/connector'
import { DatabaseSettings } from '@/common/database/settings'
import { BaseModel } from '@/data/models/BaseModel'

export interface UpsertOneResult {
  insertedCount: number
  insertedId: string | undefined
  updatedCount: number
  updatedId: string | undefined
}

export interface UpsertManyResult {
  insertedCount: number
  insertedIds: string[]
  updatedCount: number
  updatedIds: string[]
}

export abstract class BaseMongoRepository<T extends BaseModel> {
  private readonly collection: Collection<T> | null

  /**
   * Conversion string id <=> object id.
   * This conversion is added to ensure that we don't expose ObjectId
   * as an database implementation detail to other layers of this application
   */

  private toStringId = (id: string): string => {
    return id
  }

  private toMongoId = (id: string): string => {
    return id
  }

  /**
   * Conversion of model <=> document.
   * This conversion is added to ensure that we don't expose ObjectId
   * and other implementation details of the database to other layers of this application
   */

  private convertToModel = (document: WithId<any>): T => {
    const { _id, ...rest } = document
    const model = _id ? { ...rest, id: this.toStringId(_id) } : { ...rest }
    return model
  }

  private convertToDocument = (model: T): OptionalUnlessRequiredId<T> => {
    const { id, ...rest } = model
    const document = id ? { ...rest, _id: this.toMongoId(id) } : { ...rest, _id: DatabaseSettings.mongo.generatePrimaryKey() }
    return document as OptionalUnlessRequiredId<T>
  }

  private convertToPartialDocument = (model: Partial<T>): MatchKeysAndValues<T> => {
    const { id, ...rest } = model
    const document = id ? { ...rest, _id: this.toMongoId(id) } : { ...rest }
    return document as MatchKeysAndValues<T>
  }

  private modifyFilter = (filter: Filter<T>): Filter<any> => {
    const { id, ...rest } = filter
    const _id = typeof id === 'string' ? this.toMongoId(id) : undefined
    return id ? { ...rest, _id } : { ...rest }
  }

  /**
   * Helper functions to be used when creating or updating database entries.
   * This helps tracking changes to the database without the need of adding
   * such logic to every repository that extends this class
   */

  private updateCreatedAt = (model: T): T => {
    return {
      ...model,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private updateUpdatedAt = (model: Partial<T>): Partial<T> => {
    return {
      ...model,
      updatedAt: new Date(),
    }
  }

  /**
   * Default interaction functions to be used by the repositories that extend this class.
   * Enabling finding, inserting, upserting, updating, deleting and countinc databse entries
   */

  protected async findOne(filter: Filter<T>, options?: FindOptions<T>): Promise<T | null> {
    if (!this.collection) return null
    const result = await this.collection.findOne(this.modifyFilter(filter), options)
    return result ? this.convertToModel(result) : null
  }

  protected async findMany(filter: Filter<T>, options?: FindOptions<T>): Promise<T[]> {
    if (!this.collection) return []
    const result = await this.collection.find(this.modifyFilter(filter), options).toArray()
    return result ? result.map<T>(this.convertToModel) : []
  }

  protected async findAll(): Promise<T[]> {
    if (!this.collection) return []
    const result = await this.collection.find().toArray()
    return result ? result.map<T>(this.convertToModel) : []
  }

  protected async insertOne(model: T, options?: InsertOneOptions): Promise<InsertOneResult<T> | null> {
    if (!this.collection) return null
    const modifiedModel = this.updateCreatedAt(model)
    const modifiedModelDocument = this.convertToDocument(modifiedModel)
    const result = await this.collection.insertOne(modifiedModelDocument, options)
    return result
  }

  protected async insertMany(models: T[], options?: BulkWriteOptions): Promise<InsertManyResult<T> | null> {
    if (!this.collection) return null
    const result = await this.collection.insertMany(models.map(this.updateCreatedAt).map(this.convertToDocument), options)
    return result
  }

  protected async updateOne(filter: Filter<T>, model: Partial<T>, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedModel = this.updateUpdatedAt(model)
    const modifiedModelDocument = this.convertToPartialDocument(modifiedModel)
    const result = await this.collection.updateOne(this.modifyFilter(filter), { $set: { ...modifiedModelDocument } }, options)
    return result
  }

  protected async updateMany(filter: Filter<T>, model: Partial<T>, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedModel = this.updateUpdatedAt(model)
    const modifiedModelDocument = this.convertToPartialDocument(modifiedModel)
    const result = await this.collection.updateMany(this.modifyFilter(filter), { $set: { ...modifiedModelDocument } }, options)
    return result
  }

  protected async deleteOne(filter: Filter<T>, options?: DeleteOptions): Promise<number> {
    if (!this.collection) return 0
    const result = await this.collection.deleteOne(this.modifyFilter(filter), options)
    return result.deletedCount > 0 ? result.deletedCount : 0
  }

  protected async deleteMany(filter: Filter<T>, options?: DeleteOptions): Promise<number> {
    if (!this.collection) return 0
    const result = await this.collection.deleteMany(this.modifyFilter(filter), options)
    return result.deletedCount
  }

  protected async upsertOne(model: T): Promise<UpsertOneResult | null> {
    if (!this.collection) return null
    const upsertResult = await this.upsertMany([model])
    return {
      insertedCount: upsertResult?.insertedCount || 0,
      insertedId: upsertResult?.insertedIds[0] || undefined,
      updatedCount: upsertResult?.updatedCount || 0,
      updatedId: upsertResult?.updatedIds[0] || undefined,
    }
  }

  protected async upsertMany(models: T[]): Promise<UpsertManyResult | null> {
    if (!this.collection) return null

    const upsertResult: UpsertManyResult = {
      insertedCount: 0,
      insertedIds: [],
      updatedCount: 0,
      updatedIds: [],
    }

    const bulkWriteOperations: AnyBulkWriteOperation<T>[] = models.map((model) => {
      if (!model.id) {
        return {
          insertOne: {
            document: this.convertToDocument(this.updateCreatedAt(model)) as OptionalId<T>,
          },
        }
      } else {
        const updateFilter: Filter<BaseModel> = { id: model.id }
        return {
          updateOne: {
            filter: this.modifyFilter(updateFilter),
            update: { $set: this.convertToPartialDocument(this.updateUpdatedAt(model)) },
          },
        }
      }
    })

    const bulkResult = await this.collection.bulkWrite(bulkWriteOperations)
    upsertResult.updatedCount = bulkResult.modifiedCount
    upsertResult.insertedCount = bulkResult.insertedCount
    upsertResult.updatedIds = models.map((model) => model.id).filter((id): id is string => typeof id === 'string')
    upsertResult.insertedIds = Object.values(bulkResult.insertedIds).map(this.toStringId)
    return upsertResult
  }

  async count(): Promise<number | 0> {
    if (!this.collection) return 0
    return this.collection.countDocuments()
  }

  /**
   * Exposed factory method to create an instance of repository
   */

  static instance<T = BaseMongoRepository<any>>(this: { new (): T }) {
    return new this()
  }
}

export const MongoRepository = (collectionName: string) => {
  return <T extends { new (...args: any[]): any }>(target: T) => {
    return class extends target {
      collection = DatabaseConnector.getConnection('mongo')?.collection<T>(collectionName) || null
    }
  }
}
