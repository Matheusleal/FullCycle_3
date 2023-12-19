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

    const expectedOutput = {
      id: expect.any(String),
      ...input,
    }

    expect(output).toEqual(expectedOutput)
  })

  it('should throw an error when customer name is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    input.name = ""

    await expect(useCase.execute(input)).rejects.toThrow("Name is required")
  })

  it('should throw an error when customer address street is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    input.address.street = ""

    await expect(useCase.execute(input)).rejects.toThrow("Street is required")
  })

  it('should throw an error when customer address number is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    input.address.number = 0

    await expect(useCase.execute(input)).rejects.toThrow("Number is required")
  })

  it('should throw an error when customer address zip is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    input.address.zip = ""

    await expect(useCase.execute(input)).rejects.toThrow("Zip is required")
  })

  it('should throw an error when customer address city is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input = MockCustomerModel()
    input.address.city = ""

    await expect(useCase.execute(input)).rejects.toThrow("City is required")
  })
})