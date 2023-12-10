import OrderFactory, { OrderFactoryItemProps, OrderFactoryProps } from "./order.factory";

describe("Order factory unit tests", () => {
  it("should create an order", () => {

    const orderItem: OrderFactoryItemProps = {
      id: "1",
      name: "Item 1",
      price: 10,
      productId: "1",
      quantity: 1
    }

    const orderProps: OrderFactoryProps = {
      id: "1",
      customerId: "1",
      items: [orderItem],
    }

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.total).toBe(10);
    expect(order.items.length).toBe(1);
  })
})