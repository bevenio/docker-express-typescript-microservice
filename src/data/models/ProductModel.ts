import { model, Require_id, Schema } from 'mongoose'

import { WithId } from '@/common/schemas/withid.interface'
import { BaseSchemaOptions } from '@/data/models/BaseSchemaOptions'
import { BrandModel, IBrandModel } from '@/data/models/BrandModel'

export interface IProductModel {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brand?: Require_id<IBrandModel>
}

export const ProductSchema = new Schema<IProductModel>(
  {
    name: { type: String, required: true },
    price: Number,
    amount: Number,
    amountSold: Number,
    brand: { type: Schema.Types.ObjectId, ref: BrandModel.modelName, required: false },
  },
  BaseSchemaOptions
)

export const ProductModel = model<WithId<IProductModel>>('Product', ProductSchema)
