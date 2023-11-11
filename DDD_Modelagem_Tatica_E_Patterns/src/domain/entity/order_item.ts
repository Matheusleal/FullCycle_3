export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _total: number;
  private _productId: string;

  constructor(id: string, name: string, productId: string, quantity: number, price: number) {
    this._id = id;
    this._name = name;
    this._productId = productId;
    this._quantity = quantity;
    this._price = price;
    this._total = this.orderItemTotal();

    this.validate();
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get total() { return this._total; }
  get productId() { return this._productId; }
  get quantity() { return this._quantity; }

  validate() {
    if(this._id.length === 0) throw new Error("Id is required");
    if(this._name.length === 0) throw new Error("Name is required");
    if(this._productId.length === 0) throw new Error("ProductId is required");
    if(this._quantity <= 0) throw new Error("Quantity must be greater than 0");
    if(this._price <= 0) throw new Error("Price must be greater than 0");
  }

  private orderItemTotal() {
    return this._price * this._quantity;
  }
}