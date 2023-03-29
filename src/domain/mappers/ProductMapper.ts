import { IProductModel } from '@/data/models/ProductModel'
import { ProductRepository } from '@/data/repositories/ProductRepository'
import { Product } from '@/domain/entities/Product'
import { BaseMapper } from '@/domain/mappers/BaseMapper'

export const ProductMapper: BaseMapper<Product, IProductModel> = {
  toModel: (entity) => {
    return ProductRepository.create({ ...entity })
  },

  fromModel: (model) => {
    return new Product({ ...model })
  },
}
