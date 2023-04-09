import { ProductModel } from '@/data/models/ProductModel'
import { BaseMongoRepository, MongoRepository } from '@/data/repositories/BaseMongoRepository'

@MongoRepository('products')
export class ProductRepository extends BaseMongoRepository<ProductModel> {
  async getById(id: string) {
    return this.findOne({ id })
  }

  async getAll() {
    return this.findAll()
  }

  async create(model: ProductModel) {
    return this.insertOne(model)
  }
}
