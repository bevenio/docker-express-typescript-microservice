import { IBaseEntity } from '@/domain/entities/BaseEntity.interface'

export class Brand implements IBaseEntity {
  readonly id: string
  public name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
