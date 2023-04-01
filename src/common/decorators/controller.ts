import { Route } from '@/common/schemas/route.interface'
import { ServerInstance } from '@/server'

interface ControllerInstance {
  class: any
  instance: any
}

const controllerInstances: ControllerInstance[] = []

const getControllerInstance = <T>(target: any): T => {
  let targetController = controllerInstances.find((controller) => controller.class === target)

  if (!targetController) {
    targetController = {
      class: target,
      instance: new target(),
    }
    controllerInstances.push(targetController)
  }

  return targetController?.instance
}

export const Controller = (prefix: string, version?: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
    const routes: Array<Route> = Reflect.getMetadata('routes', target)
    const server = ServerInstance
    const router = server.getRouter(version)
    const controller = getControllerInstance<typeof target>(target)

    routes.forEach((route: Route) => {
      if (!router)
        return console.debug(`Could not register route`, {
          path: `${prefix}${route.path}`,
          method: route.methodName,
          controller: target.name,
        })
      router.instance[route.method](`${prefix}${route.path}`, controller[route.methodName])
      console.debug(`Registered route [${router.version}]`, { path: `${prefix}${route.path}`, method: route.methodName, controller: target.name })
    })
  }
}
