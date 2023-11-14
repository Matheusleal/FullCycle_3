import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export type OrderFactoryProps = {
  id: string
  customerId: string
  items: OrderFactoryItemProps[]
}

export type OrderFactoryItemProps = {
  id: string
  name: string
  price: number
  productId: string
  quantity: number
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {

    const items = props.items.map(item => {
      return new OrderItem(item.id, item.name, item.productId, item.quantity, item.price);
    });

    const order = new Order(props.id, props.customerId, items);

    return order;
  }
}