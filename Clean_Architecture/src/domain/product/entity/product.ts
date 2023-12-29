import Entity from "../../@shared/entity/entity.abstract"

import ProductValidatorFactory from "../factory/product.validator.factory"

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
    ProductValidatorFactory
    .create()
    .validate(this)
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