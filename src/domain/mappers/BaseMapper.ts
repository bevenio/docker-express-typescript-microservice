import { WithId } from '@/common/schemas/withid.interface'

export interface BaseMapper<Entity, Model> {
  fromModel: (model: WithId<Model>) => Entity
  toModel: (entity: Entity) => WithId<Model>
}
