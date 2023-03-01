import { ValidationChain } from "express-validator"
import { RouteDefinition } from "../definitions/route"

export function Val(validator: ValidationChain) {
    return (target: any, propertyKey: string): void => {
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

        if(!routes) return
        const route = routes.find(route => {
            return route.methodName === propertyKey
        })

        if(!route) return
        route.validators.push(validator)
    }
}