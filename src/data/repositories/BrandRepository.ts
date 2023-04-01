import { BrandModel } from '@/data/models/BrandModel'
import { BaseMongoRepository } from '@/data/repositories/BaseMongoRepository'

export class BrandRepository extends BaseMongoRepository<BrandModel> {
  constructor() {
    super('brands')
  }

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
}
