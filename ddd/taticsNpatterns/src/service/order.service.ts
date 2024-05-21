import Order from "../entity/order";

export default class OrderService {
    static calculateTotal(orders: Order[]): number {
        let ordersTotal = 0;

        orders.forEach(order => {
            order.calculateTotal();
            ordersTotal += order.total;
        });

        return ordersTotal;
    }
}
