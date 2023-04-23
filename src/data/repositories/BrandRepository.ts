import { IBrandModel } from '@/data/entities/BrandEntity.interface'
import { BaseMongoRepository, MongoDataRepository } from '@/data/repositories/BaseDataRepositoryMongo'

@MongoDataRepository('brands')
export class BrandRepository extends BaseMongoRepository<IBrandModel> {}
