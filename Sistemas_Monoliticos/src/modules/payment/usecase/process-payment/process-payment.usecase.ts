import IUseCase from "../../../@shared/usecase/usecase.interface"
import Transaction from "../../domain/transaction.entity"
import ITransactionGateway from "../../gateway/transaction.gateway"
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto"

export default class ProcessPaymentUsecase implements IUseCase<ProcessPaymentInputDto, ProcessPaymentOutputDto> {

  private _transactionRepository: ITransactionGateway

  constructor(private transactionRepository: ITransactionGateway) {
    this._transactionRepository = transactionRepository
  }
  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {

    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId
    })

    // Processamento feito pela gateway, salvar o retorno desse processamento no banco de dados
    transaction.process()

    const output = await this._transactionRepository.save(transaction)

    return {
      transactionId: output.id.value,
      orderId: output.orderId,
      amount: output.amount,
      status: transaction.status.value,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt
    }
  }
}
