import Customer from "../../../domain/customer/entity/customer";
import { CustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerMapper{

  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zip: customer.address.zipCode
        }
      }))
    }
  }
}