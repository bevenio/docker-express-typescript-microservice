import {
  BulkWriteOptions,
  Collection,
  DeleteOptions,
  Document,
  Filter,
  FindOptions,
  InsertOneOptions,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  WithId,
} from 'mongodb'

import { DatabaseConnector } from '@/common/database/connector'

export abstract class BaseMongoRepository<T extends Document> {
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

  private modifyFilter = (filter: Filter<T>): Filter<T> => {
    return {
      _id: new ObjectId(filter.id) || undefined,
      id: undefined,
      ...filter,
    }
  }

  protected async findOne(filter: Filter<T>, options?: FindOptions<T>): Promise<T | null> {
    if (!this.collection) return null
    const result = await this.collection.findOne(this.modifyFilter(filter), options)
    return result ? this.convertToModel(result) : null
  }

  protected async findMany(filter: Filter<T>, options?: FindOptions<T>): Promise<T[] | null> {
    if (!this.collection) return null
    const result = await this.collection.find(this.modifyFilter(filter), options).toArray()
    return result ? result.map<T>(this.convertToModel) : null
  }

  protected async findAll(): Promise<T[] | null> {
    if (!this.collection) return null
    const result = await this.collection.find().toArray()
    return result ? result.map<T>(this.convertToModel) : null
  }

  protected async insertOne(model: T, options?: InsertOneOptions): Promise<T | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const result = await this.collection.insertOne(this.convertToDocument(model), modifiedOptions)
    return result ? this.convertToModel(result) : null
  }

  protected async insertMany(models: T[], options?: BulkWriteOptions): Promise<T | null> {
    if (!this.collection) return null
    const result = await this.collection.insertMany(models.map(this.convertToDocument), options)
    return result ? this.convertToModel(result) : null
  }

  protected async updateOne(model: T, options?: UpdateOptions): Promise<T | null> {
    if (!this.collection) return null
    const modifiedOptions = { ...options, upsert: true }
    const result = await this.collection.updateOne(this.convertToDocument(model), modifiedOptions)
    return result ? this.convertToModel(result) : null
  }

  protected async updateMany(filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<T | null> {
    if (!this.collection) return null
    const result = await this.collection.updateMany(filter, update, options)
    return result ? this.convertToModel(result) : null
  }

  protected async delete(filter: Filter<T>, options?: DeleteOptions): Promise<boolean> {
    if (!this.collection) return false
    const result = await this.collection.deleteOne(this.modifyFilter(filter), options)
    return result.deletedCount > 0 ? true : false
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
}
