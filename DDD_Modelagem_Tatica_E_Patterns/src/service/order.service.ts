import Order from "../entity/order";

export default class OrderService {

  static total(orders: Order[]) {
    return Number(orders.reduce((total, order) => total + order.total, 0).toFixed(2))
  }
}