import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import Client from "./client.entity";
import OrderEntity from "./order.entity";
import Product from "./product.entity";

describe('Order entity unit tests', () => {
    it('Should properly calculate the order total', () => {
        const client = new Client({
            id: new Uuid(),
            name: 'name',
            email: 'email',
            address: 'address'            
        });

        const productOne = new Product({
            id: new Uuid(),
            name: 'name',
            description: 'description',
            purchasePrice: 8
        });

        const productTwo = new Product({
            id: new Uuid(),
            name: 'name',
            description: 'description',
            purchasePrice: 5
        });

        const orderProperties = {
            id: new Uuid(),
            client: client,
            products: [productOne, productTwo]
        }

        const order = new OrderEntity(orderProperties);

        expect(order.calculateTotal()).toEqual(13);
    });

    it('Should properly approve the order', () => {
        const client = new Client({
            id: new Uuid(),
            name: 'name',
            email: 'email',
            address: 'address'            
        });

        const productOne = new Product({
            id: new Uuid(),
            name: 'name',
            description: 'description',
            purchasePrice: 8
        });

        const productTwo = new Product({
            id: new Uuid(),
            name: 'name',
            description: 'description',
            purchasePrice: 5
        });

        const orderProperties = {
            id: new Uuid(),
            client: client,
            products: [productOne, productTwo]
        }

        const order = new OrderEntity(orderProperties);

        order.approve();

        expect(order.status).toEqual('approved');
    });
});
