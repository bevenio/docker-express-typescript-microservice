import { ProductRepository } from '@/data/repositories/ProductRepository'
import { Product } from '@/domain/models/product'

export class ProductService {
  async get() {
    const products: Product[] = await ProductRepository.findAll()
    return products
  }
}
