import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/orderItem";
import Product from "./entity/product";

const address = new Address('Groove Street', 485, '123456', 'LS');

let customer = new Customer('1', 'John Doe');
customer.address = address;
customer.activate()

const productOne = new Product('uuid', 'Shoe', 25);
const productTwo = new Product('uuid', 'Shirt', 15);

const itemOne = new OrderItem('uuid', 'productUuid', 1, 25);
const itemTwo = new OrderItem('uuid', 'productUuid', 1, 15);

const order = new Order('1', customer.id, [itemOne, itemTwo]);
