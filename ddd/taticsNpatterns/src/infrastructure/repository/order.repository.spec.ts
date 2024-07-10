import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/orderItem";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";

describe('Order repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should properly create an order', async () => {
        const uuid = 'uuid';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zip = 'zip';
        const city = 'city';

        const address = new Address(street, number, zip, city);
        const customer = new Customer(uuid, name);
        customer.address = address;
        customer.activate();

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const productUuid = 'uuid';
        const productName = 'Black Shirt';
        const price = 13;

        const product = new Product(productUuid, productName, price);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItemUuid = 'uuid';
        const productQuantity = 13;

        const orderItem = new OrderItem(
            orderItemUuid,
            product.id,
            productQuantity,
            product.price
        );

        const orderUuid = 'uuid';

        const order = new Order(
            orderUuid,
            customer.id,
            [orderItem]
        );

        order.calculateTotal();

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ['items']
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total,
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    productQuantity: orderItem.productQuantity,
                    productSalePrice: orderItem.productSalePrice,
                    orderId: order.id
                }
            ]
        });
    });
});
