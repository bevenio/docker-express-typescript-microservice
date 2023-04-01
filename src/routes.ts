/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = new BrandRepository()
repo.getByName('Apple').then(console.log)
repo.count().then(console.log)
