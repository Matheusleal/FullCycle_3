import Transaction from "../domain/transaction.entity"
import PaymentGateway from "../gateway/transaction.gateway"
import TransactionModel from "./transaction.model"

export default class TransactionRepository implements PaymentGateway {
  async save(transaction: Transaction): Promise<Transaction> {

    await TransactionModel.create({
      id: transaction.id.value,
      amount: transaction.amount,
      orderId: transaction.orderId,
      status: transaction.status.value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    })

    return new Transaction({
      id: transaction.id,
      amount: transaction.amount,
      orderId: transaction.orderId,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    })
  }
}