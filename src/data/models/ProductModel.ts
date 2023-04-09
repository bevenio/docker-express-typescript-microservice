import { MongoId } from '@/data/models/BaseModel'

export interface ProductModel {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brand?: MongoId
}
