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

    static calculateRewardPoints(orders: Order[]): number {
        let rewardPoints = 0;

        orders.forEach(order => {
            order.calculateRewardPoints();
            rewardPoints += order.rewardPoints;
        });

        return rewardPoints;
    }
}
