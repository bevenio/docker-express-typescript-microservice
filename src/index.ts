import 'reflect-metadata';
import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})