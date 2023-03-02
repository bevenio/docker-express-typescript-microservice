import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { router } from './utils/decorators/controller'
import { openApiMiddleware, openApiErrorMiddleware } from './utils/middlewares/openapi'

export const createExpress = (port: number | string = 8080) => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(morgan('tiny'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(openApiMiddleware)
  app.use(openApiErrorMiddleware)
  app.use(router)
  const server = app.listen(port, console.log.bind(`[server]: running at http://localhost:${port}`))
  return { app, server }
}
