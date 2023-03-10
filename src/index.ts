import 'reflect-metadata'

import { Server } from '@/server'

/* Express */
new Server().listen()

/* Routes */
import '@/presentation/controllers/product'
