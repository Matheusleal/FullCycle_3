import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {

    const orderitem1 = new OrderItem("1", "Item 1", "10", 1, 10);
    const orderitem2 = new OrderItem("2", "Item 2", "14", 4, 5);
    const orderitem3 = new OrderItem("3", "Item 3", "3", 2, 3.15);
    const orderitem4 = new OrderItem("4", "Item 4", "3", 2, 3.15);

    const order1 = new Order("1", "customer1", [orderitem1, orderitem2, orderitem3, orderitem4]);
    const order2 = new Order("1", "customer2", [orderitem1, orderitem3, orderitem4]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(65.20);
  })
})