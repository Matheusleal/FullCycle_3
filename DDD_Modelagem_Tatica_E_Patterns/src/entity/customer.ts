// uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
// as propriedades do objeto devem ser consistentes, um customr nunca pode ser sem nome.
// uma entidade por padrão sempre precisa se autovalidar

import Address from "./address";

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

class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validateEntity();
  }

  validateEntity() {
    if (this._id.length === 0) throw new Error("Id is required");
    if (this._name.length === 0) throw new Error("Name is required");
  }

  setAddress(address: Address) {
    this._address = address;
  }

  activate() {
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

}

