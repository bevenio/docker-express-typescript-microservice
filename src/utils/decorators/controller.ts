import { Router } from 'express'
import Container from 'typedi'
import { RouteDefinition } from '../definitions/route'
import { validateMiddleware } from '../middlewares/validation'

export const router = Router()

export const Controller = (prefix: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', target)
    const instance: any = Container.get(target)
    routes.forEach((route: RouteDefinition) => {
      console.debug('Registered route ', { path: `${prefix}${route.path}`, method: route.methodName, controller: target.name })
      router[route.method](`${prefix}${route.path}`, validateMiddleware(route.validators), instance[route.methodName].bind(instance))
    })
  }
}
