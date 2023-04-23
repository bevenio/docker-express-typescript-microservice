import { IProductModel } from '@/data/entities/ProductModel.interface'
import { BaseMongoRepository, MongoDataRepository } from '@/data/repositories/BaseDataRepositoryMongo'

@MongoDataRepository('products')
export class ProductRepository extends BaseMongoRepository<IProductModel> {}
