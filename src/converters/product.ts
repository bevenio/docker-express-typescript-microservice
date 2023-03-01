import { Service } from 'typedi'
import ProductDTO from '../DTOs/product'
import Product from '../models/product'

@Service()
export class ProductConverter {
  static fromDTO(productDTO: ProductDTO): Product {
    return new Product().setId(productDTO.id).setAmount(productDTO.amount).setName(productDTO.name).setPrice(productDTO.price)
  }

  static toDTO(product: Product): ProductDTO {
    const productDTO: ProductDTO = {
      id: product.getId(),
      amount: product.getAmount(),
      name: product.getName(),
      price: product.getPrice(),
    }
    return productDTO
  }
}
