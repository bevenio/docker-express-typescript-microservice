"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(data = {}) {
        Object.assign(this, data);
    }
    setId(id) {
        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    setPrice(price) {
        this.price = price;
        return this;
    }
    getPrice() {
        return this.price;
    }
    setAmount(amount) {
        this.amount = amount;
        return this;
    }
    getAmount() {
        return this.amount;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    getName() {
        return this.name;
    }
    setTotalSold(totalSold) {
        this.totalSold = totalSold;
        return this;
    }
    getTotalSold() {
        return this.totalSold;
    }
}
exports.default = Product;