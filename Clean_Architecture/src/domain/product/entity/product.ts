import Entity from "../../@shared/entity/entity.abstract"

export default class Product extends Entity {
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()

    this.id = id
    this._name = name
    this._price = price

    this.validate()
  }

  validate() {

    if (this.id.length === 0)
      this.notification.addError({
        context: "product",
        message: "Id is required"
      })

    if (this._name.length === 0)
      this.notification.addError({
        context: "product",
        message: "Name is required"
      })

    if (this._price < 0)
      this.notification.addError({
        context: "product",
        message: "Price cannot be negative"
      })
  }

  get name() { return this._name }
  get price() { return this._price }

  changeName(name: string) {
    this._name = name
    this.validate()
  }
  changePrice(price: number) {
    this._price = price
    this.validate()
  }
}