/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = BrandRepository.instance()

//repo.saveMany([{ name: 'fake' }, { id: '642cc89680742b4cf9bb91ee', name: 'Motorola' }]).then(console.log)
repo.saveMany([{ name: 'Apple' }, { name: 'Samsung' }, { name: 'Google' }])
repo.getAll().then(console.log)
repo.count().then(console.log)
