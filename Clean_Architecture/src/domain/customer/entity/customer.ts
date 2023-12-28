// uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
// as propriedades do objeto devem ser consistentes, um customr nunca pode ser sem nome.
// uma entidade por padrão sempre precisa se autovalidar

import Address from "./value-object/address";

import AgregateRoot from "../../@shared/domain/aggregate_root.interface"
import Entity from "../../@shared/entity/entity.abstract";
import CustomerAddressChangedEvent from "../event/customer_address_changed.event";

import NotificationError from "../../@shared/notification/notification.error";

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
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();

    this.id = id;
    this._name = name;

    this.validateEntity();
  }

  get name() { return this._name; }
  get address() { return this._address; }
  get rewardPoints() { return this._rewardPoints; }

  validateEntity() {

    if (this.id.length === 0)
      this.notification.addError({
        context: "customer",
        message: "Id is required"
      });

    if (this._name.length === 0)
      this.notification.addError({
        context: "customer",
        message: "Name is required"
      });
  }

  setAddress(address: Address) {
    this._address = address;
    this.addEvent(new CustomerAddressChangedEvent(this.id, this));
  }

  isActive() {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {

      this.notification.addError({
        context: "customer",
        message: "Address is required"
      })

      return
    }

    this._address?.validate();
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

  changeName(name: string) {
    this._name = name;
    this.validateEntity();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += Number(points.toFixed());
  }

}

