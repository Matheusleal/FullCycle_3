class Customer {
  private _id: string;
  private _name: string;
  private _address: string;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id() {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get address() {
    return this._address;
  }
  set address(address: string) {
    this._address = address;
  }
}

var x = new Customer("1", "John", "New York");

