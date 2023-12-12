import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/entity/value-object/address"
import CreateCustomerUseCase from "./create.customer.usecase"

const MockCustomerModel = () => {
  const customer = {
    name: "John Doe",
    address: {
      street: "Street 1",
      city: "City 1",
      number: 1,
      zip: "Zipcode 1",
    }
  }
  return customer
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test create Customer Use Case', () => {

  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    const output = await useCase.execute(input)

    const ExpectedOutput = {
      id: expect.any(String),
      ...input,
    }

    expect(output).toEqual(ExpectedOutput)
  })
})