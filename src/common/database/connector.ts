import mongoose from 'mongoose'

import { Environment } from '@/common/configuration/environment'
import { Logger } from '@/common/logging/logger'

const connectMongoDB = async () => {
  await mongoose.connect(`mongodb://${Environment.DB_MONGO_ADRESS}:${Environment.DB_MONGO_PORT}/development`)
  Logger.log(`Connected to mongodb [${Environment.DB_MONGO_ADRESS}:${Environment.DB_MONGO_PORT}]`)
}

export const DatabaseConnector = {
  connect: async () => {
    try {
      await connectMongoDB()
    } catch (error) {
      console.error('Connecting to database failed', error)
    }
  },
}
