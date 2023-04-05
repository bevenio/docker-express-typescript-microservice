import {
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  MatchKeysAndValues,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb'

import { DatabaseConnector } from '@/common/database/connector'
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

  private toStringId = (id: ObjectId): string => {
    return id.toHexString()
  }

  private toObjectId = (id: string): ObjectId => {
    return new ObjectId(id)
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
    const document = id ? { ...rest, _id: this.toObjectId(id) } : { ...rest }
    return document as OptionalUnlessRequiredId<T>
  }

  private convertToPartialDocument = (model: Partial<T>): MatchKeysAndValues<T> => {
    const { id, ...rest } = model
    const document = id ? { ...rest, _id: this.toObjectId(id) } : { ...rest }
    return document as MatchKeysAndValues<T>
  }

  private modifyFilter = (filter: Filter<T>): Filter<any> => {
    const { id, ...rest } = filter
    const _id = typeof id === 'string' ? this.toObjectId(id) : undefined
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
    const modifiedOptions = { ...options, upsert: true }
    const modifiedModel = this.updateCreatedAt(model)
    const modifiedModelDocument = this.convertToDocument(modifiedModel)
    const result = await this.collection.insertOne(modifiedModelDocument, modifiedOptions)
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

    const upsertResult: UpsertOneResult = {
      insertedCount: 0,
      insertedId: undefined,
      updatedCount: 0,
      updatedId: undefined,
    }

    if (!model.id) {
      const insertResult = await this.insertOne(model)
      upsertResult.insertedCount = 1
      upsertResult.insertedId = insertResult ? this.toStringId(insertResult.insertedId) : undefined
    } else {
      const updateFilter: Filter<BaseModel> = { id: model.id }
      const updateResult = await this.updateOne(updateFilter, model)
      upsertResult.updatedCount = updateResult?.modifiedCount || 0
      upsertResult.updatedId = model.id
    }
    return upsertResult
  }

  protected async upsertMany(models: T[]): Promise<UpsertManyResult | null> {
    if (!this.collection) return null

    const upsertResult: UpsertManyResult = {
      insertedCount: 0,
      insertedIds: [],
      updatedCount: 0,
      updatedIds: [],
    }

    const modelsToInsert = models.filter((model: T) => !model.id)
    const modelsToUpdate = models.filter((model: T) => !!model.id)

    if (modelsToInsert.length > 0) {
      const insertResult = await this.insertMany(modelsToInsert)
      upsertResult.insertedCount = insertResult?.insertedCount || 0
      for (let i = 0; i < upsertResult.insertedCount; i++) {
        if (insertResult?.insertedIds[i]) {
          upsertResult.insertedIds.push(this.toStringId(insertResult?.insertedIds[i]))
        }
      }
    }

    if (modelsToUpdate.length > 0) {
      const bulkUpdateOperations = modelsToUpdate.map((model: T) => {
        const updateFilter: Filter<BaseModel> = { id: model.id }
        const modifiedModel = this.updateUpdatedAt(model)
        const modifiedModelDocument = this.convertToPartialDocument(modifiedModel)
        return {
          updateOne: {
            filter: this.modifyFilter(updateFilter),
            update: { $set: modifiedModelDocument },
          },
        }
      })
      const bulkResult = await this.collection.bulkWrite(bulkUpdateOperations)
      upsertResult.updatedCount = bulkResult.modifiedCount
      modelsToUpdate.forEach((model) => {
        if (model.id !== undefined) {
          upsertResult.updatedIds.push(model.id)
        }
      })
    }

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
