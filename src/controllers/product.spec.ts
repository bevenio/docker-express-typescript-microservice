import 'reflect-metadata'
import request from 'supertest'
import { createExpress } from '../express'
import './product'

const { app, server } = createExpress()

describe('GET /products', () => {
  after((done) => {
    server.close(done)
  })
  it('responds with products', (done) => {
    request(app).get('/products').expect(200, done)
  })
})
