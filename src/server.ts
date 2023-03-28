import bodyParser from 'body-parser'
import cors from 'cors'
import * as express from 'express'
import { Server as ServerHTTP } from 'http'
import morgan from 'morgan'

import { Environment } from '@/common/configuration/environment'
import { openapiErrorMiddleware, openapiValidationMiddleware } from '@/common/middlewares/openapi'

type ServerRouter = { version: string; instance: express.Router }
type ServerCallback = undefined | (() => void)

export class Server {
  private port: number
  private app = express.default()
  private environment = Environment

  public routers: ServerRouter[]
  public server: ServerHTTP

  constructor(port?: number) {
    this.port = port || this.environment.SERVER_PORT
    this.registerRouters()
    this.registerMiddlewares()
  }

  public listen(callback?: ServerCallback) {
    this.server = this.app.listen(this.port, callback)
  }

  public close(callback?: ServerCallback) {
    if (this.server) this.server.close(callback)
  }

  public getRouter(version?: string) {
    return (
      this.routers.find((router) => router.version === version) ||
      this.routers.find((router) => router.version === this.environment.API_DEFAULT_VERSION)
    )
  }

  private registerRouters() {
    this.routers = this.environment.API_VERSIONS.map((version: string) => {
      return {
        version: version,
        instance: express.Router(),
      }
    })
  }

  private registerMiddlewares() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('tiny'))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(openapiValidationMiddleware)
    this.app.use(openapiErrorMiddleware)
    this.routers.forEach((router) => {
      this.app.use(`/${router.version}`, router.instance)
    })
  }
}

export const ServerInstance = new Server()
