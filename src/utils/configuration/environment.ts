import dotenv from 'dotenv'

export class Environment {
  constructor() {
    dotenv.config()
  }

  get PORT(): number {
    return Number(process.env.PORT)
  }

  get API_VERSIONS(): string[] {
    return process.env.API_VERSIONS ? process.env.API_VERSIONS.split(',') : []
  }

  get DEFAULT_API_VERSION(): string {
    return process.env.DEFAULT_API_VERSION || 'V1'
  }
}

export const EnvironmentInstance = new Environment()
