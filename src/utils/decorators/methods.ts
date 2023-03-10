import { Route, RouteMethod } from '@/utils/schemas/route.interface'

const createRouteHandler = (path: string, method: RouteMethod) => {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<Route>
    routes.push({ method, path, methodName: propertyKey })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const Get = (path: string) => {
  return createRouteHandler(path, 'get')
}

export const Post = (path: string) => {
  return createRouteHandler(path, 'post')
}

export const Delete = (path: string) => {
  return createRouteHandler(path, 'delete')
}

export const Put = (path: string) => {
  return createRouteHandler(path, 'put')
}
