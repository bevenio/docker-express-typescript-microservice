import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { router } from './utils/decorators/controller'
import { openApiMiddleware, openApiErrorMiddleware } from './utils/middlewares/openapi'

/* Environment variables */
dotenv.config()

/* Express */
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(openApiMiddleware)
app.use(openApiErrorMiddleware)
app.use(router)

/* Controllers */
import './controllers/product'

/* Server */
const port = process.env.PORT

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
