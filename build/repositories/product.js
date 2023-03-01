"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const typedi_1 = require("typedi");
const db = [
    {
        id: 1,
        price: 12,
        amount: 7,
        name: 'Caputo - gluten free flour'
    },
    {
        id: 2,
        price: 99,
        amount: 19,
        name: 'Apple HomePod Mini'
    },
];
let ProductRepository = class ProductRepository {
    constructor() {
        this.db = db;
    }
    get() {
        return this.db;
    }
};
ProductRepository = __decorate([
    (0, typedi_1.Service)()
], ProductRepository);
exports.ProductRepository = ProductRepository;
