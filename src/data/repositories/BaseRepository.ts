import { Require_id } from 'mongoose'

/**
 * The goal of this base interface for repositories is to make sure that we return interfaces/models of the mongoose operations
 * without exposing functions as save/populate etc. which would possibly enable developers to bypass the repositories and
 * manipulate the databse directly. This case would introduce more locations for vulnerabilities.
 **/

export interface BaseRepository<ModelInterface> {
  findAll: () => Promise<Require_id<ModelInterface>[] | null>
  findById: (id: string) => Promise<Require_id<ModelInterface> | null>
  create: (item: ModelInterface) => Require_id<ModelInterface>
  createMany: (items: ModelInterface[]) => Require_id<ModelInterface>[]
  save: (item: Require_id<ModelInterface>) => void
  saveMany: (items: Require_id<ModelInterface>[]) => void
  delete: (id: string) => void
  deleteMany: (ids: string[]) => void
}
