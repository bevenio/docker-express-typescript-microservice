import { Request, Response } from 'express'

import { ProductService } from '@/domain/services/product'
import { Controller } from '@/utils/decorators/controller'
import { Get } from '@/utils/decorators/methods'

@Controller('/products')
export class ProductController {
  productService: ProductService

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
