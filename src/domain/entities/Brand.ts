import { BaseEntity } from '@/domain/entities/BaseEntity'

export class Brand extends BaseEntity {
  name: string

  constructor(data: Partial<Brand> = {}) {
    super()
    Object.assign(this, data)
  }
}
