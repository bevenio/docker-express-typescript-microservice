/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = BrandRepository.instance()
repo.getAll().then((brands) => {
  console.log(brands)
  const updatedBrand = { ...brands[0], name: 'Snapple' }
  repo.update(updatedBrand)
})
repo.count().then(console.log)
