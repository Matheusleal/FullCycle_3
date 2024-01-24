import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.dto"
import IPaymentFacade from "./payment.facade.interface"
import IUseCase from "../../@shared/usecase/usecase.interface"

export interface IClientAdmFacadeProps {
  processUseCase: IUseCase<PaymentFacadeInputDto, PaymentFacadeOutputDto>
}

export default class TransactionFacade implements IPaymentFacade {
  private _processUseCase: IUseCase<PaymentFacadeInputDto, PaymentFacadeOutputDto>

  constructor(usecaseProps: IClientAdmFacadeProps) {
    this._processUseCase = usecaseProps.processUseCase
  }

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {

    const output = await this._processUseCase.execute(input)

    return output
  }
}