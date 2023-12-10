import Address from "../entity/value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toBe(undefined);
  })

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toEqual(address);
  })

})