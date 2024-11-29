import OrderFactory from "./order.factory";

describe('Order Factory Unit Tests', () => {
    it('should properly create an order', () => {
        const orderProperties = {
            id: 'uuid',
            customerId: 'uuid',
            items: [
                {
                    id: 'uuid',
                    productId: 'uuid',
                    productQuantity: 13,
                    productSalePrice: 13
                }
            ]
        };

        const order = OrderFactory.create(orderProperties);

        expect(order.id).toEqual(orderProperties.id);
        expect(order.customerId).toEqual(orderProperties.customerId);
        expect(order.items.length).toBe(1);
    });
});
