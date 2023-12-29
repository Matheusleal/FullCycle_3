import { toXML } from "jstoxml"

import { OutputListCustomerDto } from "../../../use_case/customer/list/list.customer.dto"

export default class CustomerPresenter {
  static toXML(dto: OutputListCustomerDto): string {

    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true
    }

    return toXML(
      {
        customers: {
          customer: dto.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city
            }
          }))
        }

      }, xmlOptions)
  }
}