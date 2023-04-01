import { Db as MongoDatabase, MongoClient } from 'mongodb'

import { Environment } from '@/common/environment/environment'
import { Logger } from '@/common/logging/logger'

interface DatabaseConnections {
  mongo: MongoDatabase | null
}

const connections: DatabaseConnections = {
  mongo: null,
}

const connectMongoDB = async () => {
  const mongoConnectionUri = `${Environment.DB_MONGO_ADRESS}`
  const mongoClientConnection = await MongoClient.connect(mongoConnectionUri)
  connections.mongo = mongoClientConnection.db(Environment.DB_MONGO_NAME)
  Logger.log(`Connected to mongodb [${mongoConnectionUri}/${Environment.DB_MONGO_NAME}]`)
}

export const DatabaseConnector = {
  connect: async () => {
    try {
      await connectMongoDB()
    } catch (error) {
      console.error('Connecting to database failed', error)
    }
  },
  getConnection: (databaseName: keyof typeof connections) => {
    if (!connections[databaseName]) {
      throw new Error(`Connection to ${databaseName} is not established`)
    }
    return connections[databaseName]
  },
}
