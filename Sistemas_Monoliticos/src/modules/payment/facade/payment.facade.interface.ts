import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.dto"

export default interface IPaymentFacade {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>
}