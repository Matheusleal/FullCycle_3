import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "../../customer/repository/customer.model";
import OrderItemModel from "./order_Item.model";

@Table({
  tableName: "orders",
  timestamps: false
})
export default class OrderModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  @ForeignKey(() => CustomerModel)
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @Column({ allowNull: false })
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]
}
