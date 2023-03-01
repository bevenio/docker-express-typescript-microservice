"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.router = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
exports.router = (0, express_1.Router)();
const Controller = (prefix) => {
    return (target) => {
        Reflect.defineMetadata('prefix', prefix, target);
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
        const routes = Reflect.getMetadata('routes', target);
        const instance = typedi_1.default.get(target);
        routes.forEach((route) => {
            console.debug('Registered route ', { path: `${prefix}${route.path}`, method: route.methodName, controller: target.name });
            exports.router[route.method](`${prefix}${route.path}`, instance[route.methodName].bind(instance));
        });
    };
};
exports.Controller = Controller;
