import { BrandModel } from '@/data/models/BrandModel'
import { BaseMongoRepository, MongoRepository } from '@/data/repositories/BaseMongoRepository'

@MongoRepository('brands')
export class BrandRepository extends BaseMongoRepository<BrandModel> {
  async getById(id: string) {
    return this.findOne({ id })
  }

  async getByName(name: string): Promise<BrandModel[]> {
    return this.findMany({ name })
  }

  async getAll() {
    return this.findAll()
  }

  async create(model: BrandModel) {
    return this.insertOne(model)
  }

  async update(model: BrandModel) {
    return this.updateOne({ id: model.id }, model)
  }

  async updateBrandNames(fromName: string, toName: string) {
    return this.updateMany({ name: fromName }, { name: toName })
  }

  async upsertMany(models: BrandModel[]) {
    return this.updateMany({}, models)
  }
}
