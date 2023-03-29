export class Product {
  id: string
  price: number
  amount: number
  name: string
  gener: number
  totalSold: number

  constructor(data: Partial<Product> = {}) {
    Object.assign(this, data)
  }

  setId(id: string) {
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
