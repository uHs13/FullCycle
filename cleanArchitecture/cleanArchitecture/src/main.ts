import Address from "./domain/customer/valueObject/address";
import Customer from "./domain/customer/entity/customer";
import Product from "./domain/product/entity/product";
import OrderItem from "./domain/checkout/entity/orderItem";
import Order from "./domain/checkout/entity/order";

const address = new Address('Groove Street', 485, '123456', 'LS');

let customer = new Customer('1', 'John Doe');
customer.address = address;
customer.activate()

const productOne = new Product('uuid', 'Shoe', 25);
const productTwo = new Product('uuid', 'Shirt', 15);

const itemOne = new OrderItem('uuid', 'productUuid', 1, 25);
const itemTwo = new OrderItem('uuid', 'productUuid', 1, 15);

const order = new Order('1', customer.id, [itemOne, itemTwo]);
