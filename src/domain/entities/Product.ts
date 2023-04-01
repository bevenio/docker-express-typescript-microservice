import { BaseEntity } from '@/domain/entities/BaseEntity'
import { Brand } from '@/domain/entities/Brand'

export class Product extends BaseEntity {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brand?: Brand

  constructor(data: Partial<Product> = {}) {
    super()
    Object.assign(this, data)
  }
}
