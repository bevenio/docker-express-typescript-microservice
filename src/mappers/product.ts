import { Service } from 'typedi'
import { ProductDTO } from '../DTOs/product'
import { Product } from '../models/product'

@Service()
export class ProductConverter {
  static fromDTO(productDTO: ProductDTO): Product {
    return new Product(productDTO)
  }

  static toDTO(product: Product): ProductDTO {
    const productDTO: ProductDTO = {
      id: product.id,
      amount: product.amount,
      name: product.name,
      price: product.price,
    }
    return productDTO
  }
}
