import { Document } from 'mongodb'

export interface BaseModel extends Document {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}
