/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = BrandRepository.instance()

repo
  .saveMany([
    { id: '642cc89680742b4cf9bb91ed', name: 'LG' },
    { id: '642cc89680742b4cf9bb91ee', name: 'Motorola' },
  ])
  .then(console.log)
repo.count().then(console.log)
