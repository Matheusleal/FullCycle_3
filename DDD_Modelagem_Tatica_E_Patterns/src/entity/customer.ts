// uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
// as propriedades do objeto devem ser consistentes, um customr nunca pode ser sem nome.
// uma entidade por padrão sempre precisa se autovalidar
class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;

    this.validateEntity();
  }

  validateEntity() {
    if (this._id.length === 0) throw new Error("Id is required");
    if (this._name.length === 0) throw new Error("Name is required");
  }

  validateAddress() {
    if (this._address.length === 0) throw new Error("Address is required to activate customer");
  }

  activate() {
    this.validateAddress();
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

var x = new Customer("1", "John", "New York");

