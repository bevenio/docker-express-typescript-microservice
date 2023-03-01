import { ValidationChain } from 'express-validator'

export interface RouteDefinition {
  path: string
  method: 'get' | 'post' | 'delete' | 'put'
  methodName: string
  validators: ValidationChain[]
}
