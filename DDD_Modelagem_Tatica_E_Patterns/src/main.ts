import Address from "./domain/customer/entity/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/order/entity/order";
import OrderItem from "./domain/order/entity/order_item";


let customer = new Customer("1", "John");
const address = new Address("Street", 1, "00000-000", "City");
customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", "2", 2, 10);
const item2 = new OrderItem("2", "Item 1", "2", 3, 15);

const order = new Order("123", customer.id, [item1, item2]);