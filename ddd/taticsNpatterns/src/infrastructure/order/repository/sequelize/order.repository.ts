import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";


export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            total: entity.total,
            rewardPoints: entity.rewardPoints,
            customerId: entity.customerId,
            items: entity.items.map((item) => ({
                id: item.id,
                productQuantity: item.productQuantity,
                productSalePrice: item.productSalePrice,
                orderId: item.orderId,
                productId: item.productId
            })),
        }, {
            include: [{model: OrderItemModel}],
        });
    }
}
