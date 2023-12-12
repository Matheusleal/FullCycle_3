import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

const customer1 = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"));
const customer2 = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 2, "Zipcode 2", "City 2"));

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test list customer use case', () => {

  it('should list customers', async () => {
    const customerRepository = MockRepository()
    const useCase = new ListCustomerUseCase(customerRepository)

    const output = await useCase.execute()

    expect(output.customers.length).toBe(2)

    expect(output.customers[0]).toEqual(customer1)
    expect(output.customers[0].id).toEqual(customer1.id)
    expect(output.customers[0].name).toEqual(customer1.name)
    expect(output.customers[0].address.street).toEqual(customer1.address.street)
    expect(output.customers[0].address.number).toEqual(customer1.address.number)
    expect(output.customers[0].address.zip).toEqual(customer1.address.zipCode)
    expect(output.customers[0].address.city).toEqual(customer1.address.city)

    expect(output.customers[1]).toEqual(customer2)
    expect(output.customers[1].id).toEqual(customer2.id)
    expect(output.customers[1].name).toEqual(customer2.name)
    expect(output.customers[1].address.street).toEqual(customer2.address.street)
    expect(output.customers[1].address.number).toEqual(customer2.address.number)
    expect(output.customers[1].address.zip).toEqual(customer2.address.zipCode)
    expect(output.customers[1].address.city).toEqual(customer2.address.city)

  })
})