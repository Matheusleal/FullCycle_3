import OrderItem from "../entity/order_item";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface OrderItemRepositoryInterface extends RepositoryInterface<OrderItem> { }