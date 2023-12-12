import Address from "../../../domain/customer/entity/value-object/address"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import UpdateCustomerUseCase from "./update.customer.usecase"

  const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
  const MockCustomerModel = CustomerFactory.createWithAddress("John Doe", address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(MockCustomerModel)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test Update Customer Use Case', () => {

  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUseCase(customerRepository)

    const customer = MockCustomerModel

    const input = {
      id: customer.id,
      name: "John Doe Updated",
      address: {
        street: "Street 10",
        city: "City 10",
        number: 10,
        zip: "Zipcode 10",
      }
    }

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })

})