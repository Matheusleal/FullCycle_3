import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import PaymentFacadeFactory from "./payment.facade.factory"
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

    const facade = PaymentFacadeFactory.create()

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