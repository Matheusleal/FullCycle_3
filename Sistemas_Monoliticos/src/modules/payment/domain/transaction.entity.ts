import BaseEntity from "../../@shared/domain/entity/base.entity"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import Id from "../../@shared/domain/value-object/id.value-object"
import Status, { StatusEnum } from "./value-object/status.value-object"

export class TransactionId extends Id {
  constructor(id: string) {
    super(id)
  }
}

type TransactionProps = {
  id?: TransactionId
  amount: number
  orderId: string
  status?: Status
  createdAt?: Date
  updatedAt?: Date
}

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number
  private _orderId: string
  private _status: Status

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = props.status || Status.create()
  }

  get amount(): number { return this._amount }
  get orderId(): string { return this._orderId }
  get status(): Status { return this._status }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error('Amount must be greater than zero')
    }
  }

  updateStatus(status: StatusEnum): void {
    this._status = Status.createFromEnum(status)
  }

  updateAmount(amount: number): void {
    this._amount = amount
  }

  approve(): void {
    this._status = Status.createFromEnum(StatusEnum.APPROVED)
  }

  decline(): void {
    this._status = Status.createFromEnum(StatusEnum.DECLINED)
  }

  process(): void {
    this._amount >= 100 ? this.approve() : this.decline()
  }

}