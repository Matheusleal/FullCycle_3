import Address from "../../../domain/customer/entity/value-object/address"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface"
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto"

export default class UpdateCustomerUseCase {
  private _customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this._customerRepository.find(input.id)

    if (!customer) {
      throw new Error("Customer not found")
    }

    const newAddress = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    customer.changeName(input.name)
    customer.setAddress(newAddress)

    await this._customerRepository.update(customer)

    const output: OutputUpdateCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zipCode,
      },
    }

    return output
  }
}