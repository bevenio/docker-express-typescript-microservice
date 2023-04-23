import { IBaseEntity } from '@/data/entities/BaseEntity.interface'

export interface IBaseDataRepository<T extends IBaseEntity> {
  /* Queries */
  count: () => Promise<number>
  getById: (id: string) => Promise<T | null>
  getByIds: (ids: string[]) => Promise<T[]>
  getByValue: <K extends keyof T>(key: K, value: T[K]) => Promise<T | null>
  getByValues: <K extends keyof T>(key: K, value: T[K][]) => Promise<T[]>
  getAll: () => Promise<T[]>
  /* Commands */
  save: (entity: T) => void
  saveMany: (entities: T[]) => void
  remove: (entity: T) => void
  removeMany: (entities: T[]) => void
}
