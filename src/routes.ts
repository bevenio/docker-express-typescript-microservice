/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { BrandRepository } from './data/repositories/BrandRepository'
const repo = BrandRepository.instance()

//repo.saveMany([{ name: 'fake' }, { id: '642cc89680742b4cf9bb91ee', name: 'Motorola' }]).then(console.log)
//repo.saveMany([{ name: 'Apple' }, { name: 'Samsung' }, { name: 'Google' }])
repo.getByValues('d', ['2c70f869-f36c-4ec3-ac0f-4e3b15ef493b', '6c1e37a2-4ef4-4f8a-8723-4f17c58ead0a']).then(console.log)
repo.count().then(console.log)

/* Updated structure:

Data: (Interaction with DBs/APIs, Data is not connected logically)
  - models (Typescript representation of what is stored in DB)
  - repositories (exposes MongoEntityRepository implements EntityRepository<Model>)

Domain: (Domain logic, creation of domain building blocks)
  - entities (Entities as POJOs to be used by aggregates)
  - aggregates (One or more entities bundled to logical domain building blocks)
  - repositories (exposes DomainRepository<Aggregate>)
  - services (Utilises Aggregates returned by the repositories to CRUD them)

Presentation: (Exposing results of domain interaction to other systems)
  - ... 
*/
