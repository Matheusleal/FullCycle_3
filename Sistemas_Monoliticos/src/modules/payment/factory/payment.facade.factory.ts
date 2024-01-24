import IPaymentFacade from "../facade/payment.facade.interface"
import TransactionRepository from "../repository/transaction.repository"
import TransactionFacade from "../facade/transaction.facade"
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase"

export default class PaymentFacadeFactory {
  static create(): IPaymentFacade {

    const repository = new TransactionRepository()
    const usecase = new ProcessPaymentUseCase(repository)

    return new TransactionFacade({
      processUseCase: usecase
    })
  }
}