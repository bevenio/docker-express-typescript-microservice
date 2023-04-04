import { BaseEntity, DomainEntity } from '@/domain/entities/BaseEntity'

@DomainEntity()
export class Brand extends BaseEntity {
  public name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}
