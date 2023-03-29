import { model, Require_id, Schema } from 'mongoose'

import { BaseSchemaOptions } from '@/data/models/BaseSchemaOptions'
import { ProductInterface, ProductModel } from '@/data/models/ProductModel'

export interface BrandInterface {
  name: string
  products: Require_id<ProductInterface>[]
}

export const BrandSchema = new Schema<BrandInterface>(
  {
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: ProductModel.modelName, required: true }],
  },
  BaseSchemaOptions
)

export const BrandModel = model<BrandInterface>('Brand', BrandSchema)
