import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model.sequelize";
import CheckoutRepository from "./checkout.repository";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import OrderEntity from "../../domain/order.entity";
import Product from "../../domain/product.entity";

describe('Checkout repository integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([OrderModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly create an order', async () => {
        const checkoutRepository = new CheckoutRepository();

        const uuid = new Uuid();
        const products = [
            new Product({
                id: new Uuid(),
                name: 'name',
                description: 'description',
                purchasePrice: 13
            })
        ];

        const checkoutProperties = {
            id: uuid,
            products: products,
        }

        const order = new OrderEntity(checkoutProperties);

        order.defineInvoiceId(uuid.value);

        await checkoutRepository.addOrder(order);

        const foundOrder = await OrderModel.findOne({where: {id: order.id.value}});

        expect(foundOrder.id).toEqual(order.id.value);
        expect(foundOrder.invoiceId).toEqual(order.invoiceId);
    });

    it('Should properly find an order', async () => {
        const checkoutRepository = new CheckoutRepository();

        const uuid = new Uuid();
        const products = [
            new Product({
                id: new Uuid(),
                name: 'name',
                description: 'description',
                purchasePrice: 13
            })
        ];

        const checkoutProperties = {
            id: uuid,
            products: products,
        }

        const order = new OrderEntity(checkoutProperties);

        order.defineInvoiceId(uuid.value);

        await checkoutRepository.addOrder(order);

        const foundOrder = await checkoutRepository.findOrder(order.id.value);

        expect(foundOrder.id.value).toEqual(order.id.value);
        expect(foundOrder.invoiceId).toEqual(order.invoiceId);
        expect(foundOrder.status).toEqual(order.status);
    });
});
