  // uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
  // as propriedades do objeto devem ser consistentes, um customr nunca pode ser sem nome.

  class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  activate() {
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

}

var x = new Customer("1", "John", "New York");

