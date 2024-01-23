import BaseEntity from "../../@shared/domain/entity/base.entity"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import Id from "../../@shared/domain/value-object/id.value-object"

export class TransactionId extends Id {
  constructor(id: string) {
    super(id)
  }
}

type TransactionProps = {
  id?: TransactionId
  amount: number
  orderId: string
  status?: "pending" | "approved" | "declined"
  createdAt?: Date
  updatedAt?: Date
}

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number
  private _orderId: string
  private _status: string

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = props.status || 'pending'
  }

  get amount(): number { return this._amount }
  get orderId(): string { return this._orderId }
  get status(): string { return this._status }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error('Amount must be greater than zero')
    }
  }

  updateStatus(status: string): void {
    this._status = status
  }

  updateAmount(amount: number): void {
    this._amount = amount
  }

  approve(): void {
    this._status = 'approved'
  }

  decline(): void {
    this._status = 'declined'
  }

  process(): void {
    this._amount >= 100 ? this.approve() : this.decline()
  }
}