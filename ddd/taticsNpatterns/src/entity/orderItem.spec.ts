import OrderItem from "./orderItem";

describe('orderItem unit tests', () => {
    it('should throw an exception when try to instantiate an order item with empty id', () => {
        expect(() => {
            new OrderItem('', 'productUuid', 1, 13);
        }).toThrow('The id is required');
    });

    it('should throw an exception when try to instantiate an order item with empty product id', () => {
        expect(() => {
            new OrderItem('uuid', '', 1, 13);
        }).toThrow('The product id is required');
    });

    it('should throw an exception when try to instantiate an order item with negative product quantity', () => {
        expect(() => {
            new OrderItem('uuid', 'productUuid', -1, 13);
        }).toThrow('The product quantity must be greater than zero');
    });

    it('should throw an exception when try to instantiate an order item with zero as product quantity', () => {
        expect(() => {
            new OrderItem('uuid', 'productUuid', 0, 13);
        }).toThrow('The product quantity must be greater than zero');
    });

    it('should throw an exception when try to instantiate an order item with negative sale price', () => {
        expect(() => {
            new OrderItem('uuid', 'productUuid', 1, -13);
        }).toThrow('The product sale price must be greater or equal to zero');
    });

    it('should properly calculate the order item total', () => {
        const orderItem = new OrderItem('uuid', 'productUuid', 2, 6.5);
        orderItem.calculateTotal();

        expect(orderItem.total).toBe(13);
    });

    it('should throw an exception when try to change product quantity to a negative value', () => {
        expect(() => {
            const orderItem = new OrderItem('uuid', 'productUuid', 1, 13);
            orderItem.changeProductQuantity(-1);
        }).toThrow('The product quantity must be greater than zero');
    });

    it('should throw an exception when try to change product quantity to zero', () => {
        expect(() => {
            const orderItem = new OrderItem('uuid', 'productUuid', 1, 13);
            orderItem.changeProductQuantity(0);
        }).toThrow('The product quantity must be greater than zero');
    });

    it('should proper change product quantity', () => {
        const orderItem = new OrderItem('uuid', 'productUuid', 1, 13);
        orderItem.changeProductQuantity(2);

        expect(orderItem.productQuantity).toBe(2);
    });

    it('should throw an exception when try to change product sale price to a negative value', () => {
        expect(() => {
            const orderItem = new OrderItem('uuid', 'productUuid', 1, 13);
            orderItem.changeProductSalePrice(-1);
        }).toThrow('The product sale price must be greater or equal to zero');
    });

    it('should proper change product sale price', () => {
        const orderItem = new OrderItem('uuid', 'productUuid', 1, 5);
        orderItem.changeProductSalePrice(13);

        expect(orderItem.productSalePrice).toBe(13);
    });
});
