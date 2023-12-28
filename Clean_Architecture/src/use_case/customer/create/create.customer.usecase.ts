import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import NotificationError from "../../../domain/@shared/notification/notification.error";

export default class CreateCustomerUseCase {
  private _customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {

    const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    const customer = CustomerFactory.createWithAddress(input.name, address)

    if (!customer.isValid) {
      throw new NotificationError(customer.getErrors())
    }

    await this._customerRepository.create(customer)

    const output: OutputCreateCustomerDto = {
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