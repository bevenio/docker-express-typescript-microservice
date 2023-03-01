"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const typedi_1 = require("typedi");
const product_1 = require("../services/product");
const controller_1 = require("../utils/decorators/controller");
const routes_1 = require("../utils/decorators/routes");
let ProductController = class ProductController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.productService.get();
                res.send({ data: result });
            }
            catch (error) {
                res.status(error.statusCode || 500).send({ message: error.message });
            }
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", product_1.ProductService)
], ProductController.prototype, "productService", void 0);
__decorate([
    (0, routes_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
ProductController = __decorate([
    (0, controller_1.Controller)('/product'),
    (0, typedi_1.Service)()
], ProductController);
exports.ProductController = ProductController;
