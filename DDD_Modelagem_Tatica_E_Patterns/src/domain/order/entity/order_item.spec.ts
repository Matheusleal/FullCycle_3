import OrderItem from "./order_item";

describe("Order Item unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new OrderItem("", "Item 1", "10", 1, 10);
    }).toThrow("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const order = new OrderItem("1", "", "10", 1, 10);
    }).toThrow("Name is required");
  })

  it("should throw error when productId is empty", () => {
    expect(() => {
      const order = new OrderItem("1", "Item 1", "", 1, 10);
    }).toThrow("ProductId is required");
  })

  it("should throw error when quantity is less or equal to zero", () => {
    expect(() => {
      const order = new OrderItem("1", "Item 1", "10", 0, 10);
    }).toThrow("Quantity must be greater than 0")
  })

  it("should throw error when price is less or equal to zero", () => {
    expect(() => {
      const order = new OrderItem("1", "Item 1", "10", 1, 0);
    }).toThrow("Price must be greater than 0")
  })

  it("should throw error if the item quantity is less or equal to zero", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", "10", 0, 10);
    }).toThrow("Quantity must be greater than 0")
   })

})