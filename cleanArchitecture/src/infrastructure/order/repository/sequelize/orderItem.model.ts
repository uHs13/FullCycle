import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

@Table({
    tableName: 'order_items',
    timestamps: false
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare productQuantity: number;

    @Column({allowNull: false})
    declare productSalePrice: number;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;
}
