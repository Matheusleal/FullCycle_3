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
    create: jest.fn().mockReturnValue(Promise.resolve(MockCustomerModel())),
    update: jest.fn(),
  }
}

describe('Unit Test Update Customer Use Case', () => {

  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUseCase(customerRepository)

    const input = {
      id: "123",
      name: "John Doe Updated",
      address: {
        street: "Street 10",
        city: "City 10",
        number: 10,
        zip: "Zipcode 10",
      }
    }

    await useCase.execute(input)

    const output = await customerRepository.find(input.id)

    expect(output).toEqual(input)
  })

})