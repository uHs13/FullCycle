import Order from "./order";
import OrderItem from "../entity/orderItem";

describe('Order unit tests', () => {
    it('should throw an exception when try to instantiate an order with empty id', () => {
        expect(() => {
            new Order('', 'uuid', [new OrderItem('uuid', 'productUuid', 1, 13)]);
        }).toThrow('The id is required');
    });

    it('should throw an exception when try to instantiate an order with empty customer id', () => {
        expect(() => {
            new Order('uuid', '', [new OrderItem('uuid', 'productUuid', 1, 13)]);
        }).toThrow('The customer id is required');
    });

    it('should throw an exception when try to instantiate an order with empty items array', () => {
        expect(() => {
            new Order('uuid', 'customerUuid', []);
        }).toThrow('Its mandatory to inform the order items');
    });

    it('should properly calculate the order total', () => {
        const itemOne = new OrderItem('uuid', 'productUuid', 2, 3);
        const itemTwo = new OrderItem('uuid', 'productUuid', 2, 3.5);

        const order = new Order('uuid', 'customerUuid', [itemOne, itemTwo]);
        order.calculateTotal();

        expect(order.total).toBe(13);
    });
});
