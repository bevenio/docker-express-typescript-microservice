export class Product {
  id: number
  price: number
  amount: number
  name: string
  totalSold: number

  constructor(data: Partial<Product> = {}) {
    Object.assign(this, data)
  }

  setId(id: number) {
    this.id = id
    return this
  }

  setPrice(price: number) {
    this.price = price
    return this
  }

  setAmount(amount: number) {
    this.amount = amount
    return this
  }

  setName(name: string) {
    this.name = name
    return this
  }

  setTotalSold(totalSold: number) {
    this.totalSold = totalSold
    return this
  }
}
