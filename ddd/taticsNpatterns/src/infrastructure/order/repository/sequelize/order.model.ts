import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./orderItem.model";

@Table({
    tableName: 'orders',
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare total: number;

    @Column({allowNull: false})
    declare rewardPoints: number;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];
}
