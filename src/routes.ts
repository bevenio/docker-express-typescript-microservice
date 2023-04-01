/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = new BrandRepository()
repo.getAll().then(console.log)
repo.count().then(console.log)
repo.create({ name: 'Samsung' })
