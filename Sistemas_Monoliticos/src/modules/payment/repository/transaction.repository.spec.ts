import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model"
import TransactionRepository from "./transaction.repository"
import Transaction from "../domain/transaction.entity"

describe('Transaction Repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  }, 11000)

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a transaction', async () => {
    const repository = new TransactionRepository()

    const transaction = new Transaction({
      amount: 100,
      orderId: '1'
    })
    transaction.approve()

    var result = await repository.save(transaction)

    expect(result.id.value).toEqual(transaction.id.value)
    expect(result.orderId).toEqual('1')
    expect(result.status.value).toEqual('approved')
    expect(result.amount).toEqual(100)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()

  })

})