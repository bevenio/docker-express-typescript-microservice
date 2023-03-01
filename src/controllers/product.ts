import { Request, Response } from 'express'
import { body } from 'express-validator'
import { Inject, Service } from 'typedi'
import { ProductService } from '../services/product'
import { Controller } from '../utils/decorators/controller'
import { Get } from '../utils/decorators/routes'
import { Val } from '../utils/decorators/validators'

@Controller('/products')
@Service()
export class ProductController {
  @Inject()
  productService: ProductService

  @Val(body().isObject())
  @Get('/')
  async get(req: Request, res: Response) {
    try {
      const result = await this.productService.get()
      res.send({ data: result })
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message })
    }
  }
}
