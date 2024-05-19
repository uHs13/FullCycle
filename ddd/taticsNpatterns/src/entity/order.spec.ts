import Order from "./order";
import OrderItem from "./orderItem";

describe('Order unit tests', () => {
    it('should throw an exception when try to instantiate an order without id', () => {
        expect(() => {
            new Order('', 'uuid', [new OrderItem('uuid', 'name', 13)]);
        }).toThrow('The id is required');
    });

    it('should throw an exception when try to instantiate an order without customer id', () => {
        expect(() => {
            new Order('uuid', '', [new OrderItem('uuid', 'name', 13)]);
        }).toThrow('The customer id is required');
    });

    it('should throw an exception when try to instantiate an order without items', () => {
        expect(() => {
            new Order('uuid', 'customerUuid', []);
        }).toThrow('Its mandatory to inform the order items');
    });

    it('should properly calculate the order total', () => {
        const itemOne = new OrderItem('uuid', 'Product A', 5);
        const itemTwo = new OrderItem('uuid', 'Product B', 8);

        const order = new Order('uuid', 'customerUuid', [itemOne, itemTwo]);
        order.calculateTotal();

        expect(order.total).toBe(13);
    });
});
