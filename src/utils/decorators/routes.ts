import { RouteDefinition } from '../definitions/route'

export function Get(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
    routes.push({
      method: 'get',
      path,
      methodName: propertyKey,
      validators: [],
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export function Post(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
    routes.push({
      method: 'post',
      path,
      methodName: propertyKey,
      validators: [],
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export function Delete(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
    routes.push({
      method: 'delete',
      path,
      methodName: propertyKey,
      validators: [],
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export function Put(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
    routes.push({
      method: 'put',
      path,
      methodName: propertyKey,
      validators: [],
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
