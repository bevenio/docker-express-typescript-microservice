import 'reflect-metadata'
import './product'

import request from 'supertest'

import { Server } from '@/server'

const server = new Server()

describe('GET /products', () => {
  before(() => {
    server.listen()
  })
  after((done) => {
    server.close(done)
  })
  it('responds with products', (done) => {
    request(server).get('/products').expect(200, done)
  })
})
