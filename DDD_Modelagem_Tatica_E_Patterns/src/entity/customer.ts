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

  // uma ação para representar uma regra de negócio, get/set só altera o valor, porém não espressa negócio.
  activate() {
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

}

var x = new Customer("1", "John", "New York");

