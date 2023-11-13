import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_Item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Order from "../../domain/entity/order";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.setAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.id,
      2,
      product.price,
    );

    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          order_id: order.id,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
        },
      ],
    });
  })

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.setAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.id,
      2,
      product.price,
    );

    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const createdOrder = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => (new OrderItem(
        item.id,
        item.name,
        item.product_id,
        item.quantity,
        item.price,
      ))),
    )

    const newOrderItem = new OrderItem(
      "1",
      product.name,
      product.id,
      5,
      product.price,
    )

    const orderToUpdate = new Order(createdOrder.id, createdOrder.customerId, [newOrderItem]);

    await orderRepository.update(orderToUpdate);

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: orderToUpdate.id },
      include: ["items"],
    })


    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: orderToUpdate.id,
      customer_id: orderToUpdate.customerId,
      total: orderToUpdate.total,
      items: [
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          order_id: orderToUpdate.id,
          product_id: newOrderItem.productId,
          quantity: newOrderItem.quantity,
        },
      ],
    });
  })

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.setAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.id,
      2,
      product.price,
    );

    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const foundOrder = await orderRepository.find(order.id);

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      total: foundOrder.total,
      items: foundOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order_id: foundOrder.id,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    });
  })

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.setAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("223", "Product 2", 20);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.id,
      2,
      product.price,
    )

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.id,
      3,
      product2.price,
    )

    const orderItem3 = new OrderItem(
      "3",
      product2.name,
      product2.id,
      10,
      product2.price,
    )

    const order = new Order("123", customer.id, [orderItem, orderItem2]);
    const order2 = new Order("223", customer.id, [orderItem3]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toEqual([order, order2]);
  })
});