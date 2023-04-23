import { Document } from 'mongodb'

export interface IBaseEntity extends Document {
  readonly id?: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}
