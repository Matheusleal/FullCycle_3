import Transaction from "../domain/transaction.entity"

export default interface ITransactionGateway {
  save(transaction: Transaction): Promise<Transaction>
}