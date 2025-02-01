import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import OrderEntity from "../../domain/order.entity";
import CheckoutGatewayInterface from "../../gateway/checkout.gateway.interface";
import OrderModel from "./order.model.sequelize";

export default class CheckoutRepository implements CheckoutGatewayInterface {
    async addOrder(order: OrderEntity): Promise<OrderEntity> {
        try {
            await OrderModel.create({
                id: order.id.value,
                invoiceId: order.invoiceId,
                status: order.status,
                total: order.calculateTotal()
            });

            return order;
        } catch (error) {
            throw error;
        }
    }

    async findOrder(id: string): Promise<OrderEntity> {
        try {
            const foundOrder = await OrderModel.findOne({
                where: {id: id}
            });

            if (!foundOrder) {
                throw new Error(`Order '${id}' was not found`);
            }

            const order = new OrderEntity({
                id: new Uuid(foundOrder.id),
                status: foundOrder.status,
            });

            order.defineInvoiceId(foundOrder.invoiceId);

            return order;
        } catch (error) {
            throw error;
        }
    }
}
