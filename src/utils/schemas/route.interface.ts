export type RouteMethod = 'get' | 'post' | 'delete' | 'put'

export interface Route {
  path: string
  method: RouteMethod
  methodName: string
}
