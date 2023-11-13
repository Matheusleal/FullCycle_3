import Address from "../../domain/customer/entity/value-object/address";
import Order from "../../domain/order/entity/order";
import OrderItem from "../../domain/order/entity/order_item";
import OrderRepositoryInterface from "../../domain/order/repository/order.repository.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_Item.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    },
      {
        include: [{ model: OrderItemModel, as: "items" }],
      });
  }

  async update(entity: Order): Promise<void> {

    entity.items.forEach(async (item) => {

      await OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: entity.id
        },
        {
          where: {
            id: item.id,
          },
        }
      );
    })

    await OrderModel.update(
      {
        total: entity.total,
        customer_id: entity.customerId,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {

    try {
      let orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });

      const orderItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.quantity,
          item.price,
        );
      })

      const order = new Order(orderModel.id, orderModel.customer_id, orderItems);

      return order;

    } catch (error) {
      console.error("error: ", error);
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = orderModels.map((orderModel) => {

      const orderItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.quantity,
          item.price,
        );
      });

      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    });


    return orders;
  }
}