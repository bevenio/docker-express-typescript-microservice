import {
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  MatchKeysAndValues,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb'

import { DatabaseConnector } from '@/common/database/connector'
import { BaseModel } from '@/data/models/BaseModel'

export abstract class BaseMongoRepository<T extends BaseModel> {
  private readonly collection: Collection<T> | null

  private convertToModel = (document: WithId<any>): T => {
    const { _id, ...rest } = document
    const model = _id ? { ...rest, id: _id.toHexString() } : { ...rest }
    return model
  }

  private convertToDocument = (model: T): OptionalUnlessRequiredId<T> => {
    const { id, ...rest } = model
    const document = id ? { ...rest, _id: new ObjectId(id) } : { ...rest }
    return document as OptionalUnlessRequiredId<T>
  }

  private convertToPartialDocument = (model: Partial<T>): MatchKeysAndValues<T> => {
    const { id, ...rest } = model
    const document = id ? { ...rest, _id: new ObjectId(id) } : { ...rest }
    return document as MatchKeysAndValues<T>
  }

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

  private modifyFilter = (filter: Filter<T>): Filter<any> => {
    const { id, ...rest } = filter
    const _id = typeof id === 'string' ? new ObjectId(id) : undefined
    return id ? { ...rest, _id } : { ...rest }
  }

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

  protected async insertOne(model: T, options?: InsertOneOptions): Promise<T | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const modifiedModel = this.updateCreatedAt(model)
    const modifiedModelDocument = this.convertToDocument(modifiedModel)
    const result = await this.collection.insertOne(modifiedModelDocument, modifiedOptions)
    return result ? this.convertToModel(result) : null
  }

  protected async insertMany(models: T[], options?: BulkWriteOptions): Promise<InsertManyResult<T> | null> {
    if (!this.collection) return null
    const result = await this.collection.insertMany(models.map(this.updateCreatedAt).map(this.convertToDocument), options)
    return result
  }

  protected async updateOne(filter: Filter<T>, model: Partial<T>, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const modifiedModel = this.updateUpdatedAt(model)
    const modifiedModelDocument = this.convertToPartialDocument(modifiedModel)
    const result = await this.collection.updateOne(this.modifyFilter(filter), { $set: { ...modifiedModelDocument } }, modifiedOptions)
    return result
  }

  protected async updateMany(filter: Filter<T>, model: Partial<T>, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const modifiedModel = this.updateUpdatedAt(model)
    const modifiedModelDocument = this.convertToPartialDocument(modifiedModel)
    const result = await this.collection.updateMany(this.modifyFilter(filter), { $set: { ...modifiedModelDocument } }, modifiedOptions)
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

  async count(): Promise<number | 0> {
    if (!this.collection) return 0
    return this.collection.countDocuments()
  }

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
