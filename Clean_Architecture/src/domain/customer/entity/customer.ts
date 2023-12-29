// uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
// as propriedades do objeto devem ser consistentes, um customr nunca pode ser sem nome.
// uma entidade por padrão sempre precisa se autovalidar

import Entity from "../../@shared/entity/entity.abstract"
import Address from "./value-object/address"
import CustomerAddressChangedEvent from "../event/customer_address_changed.event"
import {CustomerValidatorFactory, CustomerActivateValidatorFactory} from "../factory/customer.validator.factory"

/*
    Complexidade de negócio:
  - Domain
  - - Entity
  - - - Customer.ts (regra de negócio)

  Complexidade acidental (infra - mundo externo):
  - Infra
  - - Repository
  - - - Customer.ts (get,set)
 */

export default class Customer extends Entity {
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()

    this.id = id
    this._name = name

    this.validate()
  }

  get name() { return this._name }
  get address() { return this._address }
  get rewardPoints() { return this._rewardPoints }

  validate() {
    CustomerValidatorFactory
    .create()
    .validate(this)
  }

  setAddress(address: Address) {
    this._address = address
    this.addEvent(new CustomerAddressChangedEvent(this.id, this))
  }

  isActive() {
    return this._active
  }

  activate() {
    CustomerActivateValidatorFactory
    .create()
    .validate(this)

    if(this.isValid) {
      this._address?.validate()
      this._active = true
    }
  }
  deactivate() {
    this._active = false
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  addRewardPoints(points: number) {
    this._rewardPoints += Number(points.toFixed())
  }

}

