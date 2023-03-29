import { model, Schema } from 'mongoose'

import { WithId } from '@/common/schemas/withid.interface'
import { BaseSchemaOptions } from '@/data/models/BaseSchemaOptions'

export interface IBrandModel {
  name: string
}

export const BrandSchema = new Schema<WithId<IBrandModel>>(
  {
    name: { type: String, required: true },
  },
  BaseSchemaOptions
)

export const BrandModel = model<WithId<IBrandModel>>('Brand', BrandSchema)
