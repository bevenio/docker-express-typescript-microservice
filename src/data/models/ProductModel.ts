import { ObjectId } from 'mongodb'

import { BaseModel } from '@/data/models/BaseModel'

export interface ProductModel extends BaseModel {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brand?: ObjectId
}
