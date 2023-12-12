export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
  customers: CustomerDto[]
}

export type CustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}