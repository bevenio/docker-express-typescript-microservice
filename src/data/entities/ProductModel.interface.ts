import { IBaseEntity } from '@/data/entities/BaseEntity.interface'

export interface IProductModel extends IBaseEntity {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brandId?: string
}
