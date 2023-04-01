/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = BrandRepository.instance()
repo.create({ name: 'Apple' })
repo.getByName('Apple').then(console.log)
repo.count().then(console.log)
