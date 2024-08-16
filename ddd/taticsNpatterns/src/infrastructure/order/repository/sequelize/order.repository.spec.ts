import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/valueObject/address";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderRepository from "./order.repository";
import RewardPointsCalculator from "../../../../domain/checkout/calculator/rewardPointsCalculator";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Order from "../../../../domain/checkout/entity/order";

describe('Order repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

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
        const orderUuid = 'uuid';

        const orderItem = new OrderItem(
            orderItemUuid,
            product.id,
            productQuantity,
            product.price
        );

        orderItem.orderId = orderUuid;

        const order = new Order(
            orderUuid,
            customer.id,
            [orderItem]
        );

        order.rewardPointsCalculator = new RewardPointsCalculator(1, 1);

        order.calculateTotal();
        order.calculateRewardPoints();

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
            rewardPoints: 169,
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
