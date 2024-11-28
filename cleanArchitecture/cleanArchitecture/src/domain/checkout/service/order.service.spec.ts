import RewardPointsCalculator from "../calculator/rewardPointsCalculator";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe('Order service unit tests', () => {
    it('should properly calculate all orders total', () => {
        const orderOne = new Order('uuidOne', 'uuidCustomer', [
            new OrderItem('uuidItemOne', 'uuidProductOne', 5, 25),
            new OrderItem('uuidItemTwo', 'uuidProductTwo', 8, 6),
            new OrderItem('uuidItemThree', 'uuidProductThree', 13, 1.75),
        ]);

        const orderTwo = new Order('uuidTwo', 'uuidCustomerTwo', [
            new OrderItem('uuidItemOne', 'uuidProductFour', 9, 14.28),
            new OrderItem('uuidItemTwo', 'uuidProductFive', 7, 2.25),
            new OrderItem('uuidItemThree', 'uuidProductSix', 4, 9.99),
        ]);

        let ordersTotal = OrderService.calculateTotal([orderOne, orderTwo]);

        expect(ordersTotal).toBe(379.98);
    });

    it('should properly calculate orders reward points', () => {
        const rewardPointsCalculator = new RewardPointsCalculator(5, 1);

        const orderOne = new Order('uuidOne', 'uuidCustomer', [
            new OrderItem('uuidItemOne', 'uuidProductOne', 5, 25),
            new OrderItem('uuidItemTwo', 'uuidProductTwo', 8, 6),
            new OrderItem('uuidItemThree', 'uuidProductThree', 13, 1.75),
        ]);

        orderOne.rewardPointsCalculator = rewardPointsCalculator;

        const orderTwo = new Order('uuidTwo', 'uuidCustomerTwo', [
            new OrderItem('uuidItemOne', 'uuidProductFour', 9, 14.28),
            new OrderItem('uuidItemTwo', 'uuidProductFive', 7, 2.25),
            new OrderItem('uuidItemThree', 'uuidProductSix', 4, 9.99),
        ]);

        orderTwo.rewardPointsCalculator = rewardPointsCalculator;

        OrderService.calculateTotal([orderOne, orderTwo]);
        let rewardPoints = OrderService.calculateRewardPoints([orderOne, orderTwo]);

        expect(rewardPoints).toBe(75);
    });
});
