import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/orderItem";

const address = new Address('Groove Street', 485, '123456', 'LS');

let customer = new Customer('1', 'John Doe');
customer.address = address;
customer.activate()

const itemOne = new OrderItem('1', 'Shoe', 25);
const itemTwo = new OrderItem('2', 'Shirt', 15);

const order = new Order('1', customer.id, [itemOne, itemTwo]);
