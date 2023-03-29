import 'reflect-metadata'

import { DatabaseConnector } from '@/common/database/connector'
import { ServerInstance } from '@/server'

/* Express */
ServerInstance.listen()

/* Databases */
DatabaseConnector.connect()

/* Routes */
// import '@/presentation/controllers/product/product'

/* Test */
import { ProductRepository } from './data/repositories/ProductRepository'

const product = ProductRepository.create({ name: 'P-1' })
console.log(product)
console.log(product.id)
