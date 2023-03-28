import { NextFunction, Request, Response } from 'express'
import * as OpenapiValidator from 'express-openapi-validator'

export const openapiValidationMiddleware = OpenapiValidator.middleware({
  apiSpec: '@openapi/v1/api.yaml',
  validateRequests: true,
  validateResponses: true,
})

export const openapiErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  })
}
