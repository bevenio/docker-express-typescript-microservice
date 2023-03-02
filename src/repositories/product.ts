import { Product } from '../models/product'
import { Service } from 'typedi'

const db = [
  {
    id: 1,
    price: 12,
    amount: 7,
    name: 'Caputo - gluten free flour',
  },
  {
    id: 2,
    price: 99,
    amount: 19,
    name: 'Apple HomePod Mini',
  },
]

@Service()
export class ProductRepository {
  db = db

  get() {
    const products: Product[] = this.db.map((entity) => new Product(entity))
    return products
  }
}
