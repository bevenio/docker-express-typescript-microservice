import { Document } from 'mongodb'

export interface BaseModel extends Document {
  readonly id?: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}
