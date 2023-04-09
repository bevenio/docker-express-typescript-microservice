import { randomUUID } from 'crypto'

export const DatabaseSettings = {
  mongo: { generatePrimaryKey: () => randomUUID() },
}
