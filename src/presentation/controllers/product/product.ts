import { Controller } from '@/common/decorators/controller'
import { Get } from '@/common/decorators/methods'
import { RequestType, ResponseType } from '@/common/schemas/transactions.interface'
import { ProductService } from '@/domain/services/product'

@Controller('/products')
export class ProductController {
  productService: ProductService

  @Get('/')
  async get(req: RequestType<'Product'>, res: ResponseType<'Product'>) {
    try {
      const result = await this.productService.get()
      res.send({ data: result })
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message })
    }
  }
}
