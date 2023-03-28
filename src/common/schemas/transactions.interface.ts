import { Request } from 'express'
import { Response } from 'express-serve-static-core' // required,

import { operations } from '@/common/schemas/openapi.interface'

type ApiOperations = keyof operations

type RequestPathParamType<T extends ApiOperations> = 'path' extends keyof operations[T]['parameters'] ? operations[T]['parameters']['path'] : never

type RequestQueryParamType<T extends ApiOperations> = 'query' extends keyof operations[T]['parameters'] ? operations[T]['parameters']['query'] : never

type RequestBodyType<T extends ApiOperations> = 'requestBody' extends keyof operations[T]
  ? 'content' extends keyof operations[T]['requestBody']
    ? 'application/json' extends keyof operations[T]['requestBody']['content']
      ? operations[T]['requestBody']['content']['application/json']
      : never
    : never
  : never

export type RequestType<T extends ApiOperations> = Request<RequestPathParamType<T>, unknown, RequestBodyType<T>, RequestQueryParamType<T>>

export type ResponseType<T extends ApiOperations> = 200 extends keyof operations[T]['responses']
  ? 'content' extends keyof operations[T]['responses'][200]
    ? 'application/json' extends keyof operations[T]['responses'][200]['content']
      ? operations[T]['responses'][200]['content']['application/json']
      : never
    : never
  : never

type PayloadType<
  operationType extends ApiOperations & string,
  codeType extends keyof operations[operationType]['responses'] & number
> = 'content' extends keyof operations[operationType]['responses'][codeType]
  ? 'application/json' extends keyof operations[operationType]['responses'][codeType]['content']
    ? operations[operationType]['responses'][codeType]['content']['application/json']
    : null
  : null

/**
 * Send response with json payload
 *
 * @param res Express Response object
 * @param _operationId OpenAPI's operation id
 * @param code HTTP code
 * @param payload response payload
 */
export function resSendJson<
  operationType extends ApiOperations & string,
  codeType extends keyof operations[operationType]['responses'] & number,
  payloadType extends PayloadType<operationType, codeType>
>(res: Response, _operationId: operationType, code: codeType, payload: payloadType): Response {
  return res.status(code).json(payload)
}

/**
 * Send response with status code 204, without payload.
 *
 * @param res Express Response object
 * @param _operationId OpenAPI's operation id
 * @param code HTTP code
 */
export function resSendStatus<operationType extends ApiOperations & string, codeType extends keyof operations[operationType]['responses'] & 204>(
  res: Response,
  _operationId: operationType,
  code: codeType
): Response {
  return res.sendStatus(code)
}
