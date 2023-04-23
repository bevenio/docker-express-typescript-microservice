import { IBaseEntity } from '@/domain/entities/BaseEntity.interface'

export abstract class BaseAggregate {
  readonly id: string
  readonly root: IBaseEntity
}
