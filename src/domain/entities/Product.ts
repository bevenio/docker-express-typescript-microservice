import { BaseEntity, DomainEntity } from '@/domain/entities/BaseEntity'
import { Brand } from '@/domain/entities/Brand'

@DomainEntity()
export class Product extends BaseEntity {
  name: string
  price?: number
  amount?: number
  amountSold?: number
  brand?: Brand

  constructor() {
    super()
  }
}
