import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", [])
    }).toThrow("Id is required");
  })

  it("should throw error when CustomerId is empty", () => {
    expect(() => {
      const order = new Order("1", "", [])
    }).toThrow("CustomerId is required");
  })

  it("should throw error when items are empty", () => {
    expect(() => {
      const order = new Order("1", "2", [])
    }).toThrow("Items are required");
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10);
    const item2 = new OrderItem("2", "Item 2", 14);
    const item3 = new OrderItem("3", "Item 3", 3.18);

    const order = new Order("1", "2", [item1, item2, item3]);

    expect(order.total).toBe(27.18);
  })

})