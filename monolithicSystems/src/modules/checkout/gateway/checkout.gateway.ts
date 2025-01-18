import OrderEntity from "../domain/order.entity";

export default interface CheckoutGatewayInterface {
    addOrder(order: OrderEntity): Promise<OrderEntity>;
    findOrder(id: string): Promise<OrderEntity>;
}
