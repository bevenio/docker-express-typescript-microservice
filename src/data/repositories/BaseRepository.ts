import { WithId } from '@/common/schemas/withid.interface'

/**
 * The goal of this base interface for repositories is to make sure that we return interfaces/models of the mongoose operations
 * without exposing functions as save/populate etc. which would possibly enable developers to bypass the repositories and
 * manipulate the databse directly. This case would introduce more locations for vulnerabilities.
 **/

export interface BaseRepository<Model> {
  findAll: () => Promise<WithId<Model>[] | null>
  findById: (id: string) => Promise<WithId<Model> | null>
  create: (item: Model) => WithId<Model>
  createMany: (items: Model[]) => WithId<Model>[]
  save: (item: WithId<Model>) => void
  saveMany: (items: WithId<Model>[]) => void
  delete: (id: string) => void
  deleteMany: (ids: string[]) => void
}
