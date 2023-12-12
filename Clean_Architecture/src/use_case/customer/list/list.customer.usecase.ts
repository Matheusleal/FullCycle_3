import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface"
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto"
import ListCustomerMapper from "./list.customer.mappers"

export default class ListCustomerUseCase {
  private _customerRepository: CustomerRepositoryInterface
  constructor(private customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {

    const customers = await this._customerRepository.findAll()

    const output = ListCustomerMapper.toOutput(customers)

    return output
  }
}