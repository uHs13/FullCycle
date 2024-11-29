import OrderItem from "../entity/orderItem";
import Order from "../entity/order";

interface OrderFactoryProperties {
    id: string;
    customerId: string;
    items: {
        id: string,
        productId: string,
        productQuantity: number,
        productSalePrice: number
    }[]
}

export default class OrderFactory {
    public static create(orderProperties: OrderFactoryProperties): Order {
        const items = orderProperties.items.map(item => {
            return new OrderItem(
                item.id,
                item.productId,
                item.productQuantity,
                item.productSalePrice
            );
        });

        return new Order(
            orderProperties.id,
            orderProperties.customerId,
            items
        );
    }
}
