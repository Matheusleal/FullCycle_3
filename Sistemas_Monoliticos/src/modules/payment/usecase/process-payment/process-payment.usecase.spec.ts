import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction.entity"
import ProcessPaymentUsecase from "./process-payment.usecase"

const MockTransaction = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1'
})

const MockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(MockTransaction))
})

const MockTransactionDeclined = new Transaction({
  id: new Id('1'),
  amount: 50,
  orderId: '1'
})

const MockRepositoryDeclined = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(MockTransactionDeclined))
})

describe('ProcessPaymentUsecase unit test', () => {

  it('should approve a transaction', async () => {

    const transactionRepository = MockRepository()
    const usecase = new ProcessPaymentUsecase(transactionRepository)

    const input = {
      orderId: '1',
      amount: 100
    }

    const output = await usecase.execute(input)

    expect(output.transactionId).toBe(MockTransaction.id.value)
    expect(transactionRepository.save).toHaveBeenCalled()
    expect(output.status).toBe('approved')
    expect(output.amount).toBe(100)
    expect(output.orderId).toBe('1')
    expect(output.createdAt).toBe(MockTransaction.createdAt)
    expect(output.updatedAt).toBe(MockTransaction.updatedAt)
  })

  it('should decline a transaction', async () => {
    const transactionRepository = MockRepositoryDeclined()
    const usecase = new ProcessPaymentUsecase(transactionRepository)

    const input = {
      orderId: '1',
      amount: 50
    }

    const output = await usecase.execute(input)

    expect(output.transactionId).toBe(MockTransactionDeclined.id.value)
    expect(transactionRepository.save).toHaveBeenCalled()
    expect(output.status).toBe('declined')
    expect(output.amount).toBe(50)
    expect(output.orderId).toBe('1')
    expect(output.createdAt).toBe(MockTransactionDeclined.createdAt)
    expect(output.updatedAt).toBe(MockTransactionDeclined.updatedAt)
  })
})