import { IBaseEntity } from '@/domain/entities/BaseEntity.interface'
import { Brand } from '@/domain/entities/Brand'

export class Product implements IBaseEntity {
  readonly id: string
  public name: string
  public price: number
  public amount: number
  public amountSold: number
  public brand?: Brand

  constructor(id: string) {
    this.id = id
  }
}
