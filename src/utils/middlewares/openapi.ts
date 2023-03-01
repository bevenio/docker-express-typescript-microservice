import { NextFunction, Request, Response, Errback } from 'express'
import * as OpenApiValidator from 'express-openapi-validator'

export const openApiMiddleware = OpenApiValidator.middleware({
  apiSpec: '@/../openapi/v1/api.yaml',
  validateRequests: true,
  validateResponses: true,
})

export const openApiErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  })
}
