import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import TransactionRepository from "../repository/transaction.repository"
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase"
import TransactionFacade from "./transaction.facade"

describe('Transaction Facade test', () => {
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
    const paymentUseCase = new ProcessPaymentUseCase(repository)

    const facade = new TransactionFacade({
      processUseCase: paymentUseCase
    })

    const input = {
      orderId: '1',
      amount: 100
    }

    const output = await facade.process(input)

    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toBe('1')
    expect(output.amount).toBe(100)
    expect(output.status).toBe('approved')
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()

  })
})