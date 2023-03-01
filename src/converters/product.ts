import { Service } from "typedi";
import ProductDTO from "../DTOs/product";
import Product from "../models/product";

@Service()
export class ProductConverter {
    fromDTO(productDTO: ProductDTO): Product {
        return new Product()
            .setId(productDTO.getId())
            .setAmount(productDTO.getAmount())
            .setName(productDTO.getName())
            .setPrice(productDTO.getPrice())
    }

    toDTO(product: Product): ProductDTO {
        return new ProductDTO()
            .setId(product.getId())
            .setAmount(product.getAmount())
            .setName(product.getName())
            .setPrice(product.getPrice())
    }
}