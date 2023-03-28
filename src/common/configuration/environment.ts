import dotenv from 'dotenv'

class EnvironmentService {
  constructor() {
    dotenv.config()
  }

  /* SERVER SETTINGS */

  get SERVER_PORT(): number {
    return Number(process.env.SERVER_PORT)
  }

  /* API SETTINGS */

  get API_VERSIONS(): string[] {
    return process.env.API_VERSIONS ? process.env.API_VERSIONS.split(',') : []
  }

  get API_DEFAULT_VERSION(): string {
    return process.env.DEFAULT_API_VERSION || 'V1'
  }

  /* DATABASE SETTINGS */

  get DB_MONGO_ADRESS(): string {
    return `${process.env.DB_MONGO_ADRESS}`
  }

  get DB_MONGO_PORT(): number {
    return Number(process.env.DB_MONGO_PORT) || 27017
  }
}

export const Environment = new EnvironmentService()
