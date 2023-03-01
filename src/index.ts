import 'reflect-metadata';
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { router } from './utils/decorators/controller';

import './controllers/product'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(router)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})