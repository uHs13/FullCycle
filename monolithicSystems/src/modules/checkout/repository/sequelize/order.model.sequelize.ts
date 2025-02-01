import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'orders',
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare invoiceId: string;

    @Column({allowNull: false})
    declare status: string;

    @Column({allowNull: false})
    declare total: number;
}
