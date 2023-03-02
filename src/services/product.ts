import { Product } from '../models/product'
import { Inject, Service } from 'typedi'
import { ProductRepository } from '../repositories/product'

@Service()
export class ProductService {
  @Inject()
  productRepository: ProductRepository

  async get() {
    const products: Product[] = await this.productRepository.get()
    return products
  }
}
