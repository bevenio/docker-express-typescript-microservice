import {
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb'

import { DatabaseConnector } from '@/common/database/connector'
import { BaseModel } from '@/data/models/BaseModel'

export abstract class BaseMongoRepository<T extends BaseModel> {
  protected readonly collection: Collection<T> | null

  constructor(collectionName: string) {
    this.collection = DatabaseConnector.getConnection('mongo')?.collection<T>(collectionName) || null
  }

  private convertToModel = (document: WithId<any>): T => {
    const { _id, ...rest } = document
    const id = _id ? _id.toHexString() : undefined
    return { ...rest, id }
  }

  private convertToDocument = (model: T): OptionalUnlessRequiredId<T> => {
    const { id, ...rest } = model
    const _id = new ObjectId(id)
    return { ...rest, _id } as OptionalUnlessRequiredId<T>
  }

  private updateCreatedAt = (model: T): T => {
    return {
      ...model,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private updateUpdatedAt = (model: T): T => {
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
    const result = await this.collection.insertOne(this.convertToDocument(modifiedModel), modifiedOptions)
    return result ? this.convertToModel(result) : null
  }

  protected async insertMany(models: T[], options?: BulkWriteOptions): Promise<InsertManyResult<T> | null> {
    if (!this.collection) return null
    const result = await this.collection.insertMany(models.map(this.updateCreatedAt).map(this.convertToDocument), options)
    return result
  }

  protected async updateOne(model: T, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const modifiedModel = this.updateUpdatedAt(model)
    const result = await this.collection.updateOne(this.convertToDocument(modifiedModel), modifiedOptions)
    return result
  }

  protected async updateMany(filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<UpdateResult | null> {
    if (!this.collection) return null
    const modifiedUpdate: UpdateFilter<T> = { ...update, updatedAt: new Date() }
    const result = await this.collection.updateMany(filter, modifiedUpdate, options)
    return result
  }

  protected async delete(filter: Filter<T>, options?: DeleteOptions): Promise<number> {
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
