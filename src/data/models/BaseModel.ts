import { Document } from 'mongodb'

export interface BaseModel extends Document {
  readonly id?: MongoId
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export type MongoId<T = string> = T
