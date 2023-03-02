import 'reflect-metadata'
import dotenv from 'dotenv'
import { createExpress } from './express'

/* Environment variables */
dotenv.config()

/* Express */
createExpress(process.env.PORT)

/* Controllers */
import './controllers/product'
