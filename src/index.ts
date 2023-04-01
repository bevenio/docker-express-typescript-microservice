import 'reflect-metadata'

import { DatabaseConnector } from '@/common/database/connector'
import { ServerInstance } from '@/server'

/* Express */
ServerInstance.listen()

/* Databases */
DatabaseConnector.connect().then(() => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  import('@/routes')
})
