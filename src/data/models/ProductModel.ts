import { model, Schema } from 'mongoose'

import { BaseSchemaOptions } from '@/data/models/BaseSchemaOptions'

export interface ProductInterface {
  name: string
  price?: number
  amount?: number
  amountSold?: number
}

export const ProductSchema = new Schema<ProductInterface>(
  {
    name: { type: String, required: true },
    price: Number,
    amount: Number,
    amountSold: Number,
  },
  BaseSchemaOptions
)

export const ProductModel = model<ProductInterface>('Product', ProductSchema)
