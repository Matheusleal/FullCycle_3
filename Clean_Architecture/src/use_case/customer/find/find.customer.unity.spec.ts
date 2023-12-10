import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const MockCustomerModel = () => {
  const customer = new Customer("123", "Customer 1")
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
  customer.setAddress(address)

  return customer
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(MockCustomerModel())),
    findAll: jest.fn().mockReturnValue(Promise.resolve([MockCustomerModel()])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test Find Customer Use Case', () => {

  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: "123",
    }

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1",
      }
    }

    const result = await useCase.execute(input);

    expect(result).toEqual(output)
  })
})