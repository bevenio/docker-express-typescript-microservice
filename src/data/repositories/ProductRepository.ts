import { ProductModel } from '@/data/models/ProductModel'
import { BaseMongoRepository } from '@/data/repositories/BaseMongoRepository'

export class ProductRepository extends BaseMongoRepository<ProductModel> {
  constructor() {
    super('products')
  }

  async getById(id: string) {
    return this.findOne({ id })
  }

  async getAll() {
    return this.findAll()
  }
}
