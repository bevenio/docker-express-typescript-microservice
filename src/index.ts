import 'reflect-metadata'

import { DatabaseConnector } from '@/common/database/connector'
import { ServerInstance } from '@/server'

/* Express */
ServerInstance.listen()

/* Databases */
DatabaseConnector.connect()

/* Routes */
// import '@/presentation/controllers/product/product'
