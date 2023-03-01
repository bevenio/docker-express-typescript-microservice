export default class Product {
  private id: number
  private price: number
  private amount: number
  private name: string
  private totalSold: number

  constructor(data: Partial<Product> = {}) {
    Object.assign(this, data)
  }

  setId(id: number) {
    this.id = id
    return this
  }

  getId() {
    return this.id
  }

  setPrice(price: number) {
    this.price = price
    return this
  }

  getPrice() {
    return this.price
  }

  setAmount(amount: number) {
    this.amount = amount
    return this
  }

  getAmount() {
    return this.amount
  }

  setName(name: string) {
    this.name = name
    return this
  }

  getName() {
    return this.name
  }

  setTotalSold(totalSold: number) {
    this.totalSold = totalSold
    return this
  }

  getTotalSold() {
    return this.totalSold
  }
}
