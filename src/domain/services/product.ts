import { ProductRepository } from '@/data/repositories/product'
import { Product } from '@/domain/models/product'

export class ProductService {
  productRepository: ProductRepository

  async get() {
    const products: Product[] = await this.productRepository.get()
    return products
  }
}
