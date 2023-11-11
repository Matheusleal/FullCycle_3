import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrow("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("1", "");
    }).toThrow("Name is required");
  })

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  })

  it("should throw error when change name with an empty name", () => {
    expect(() => {
      const customer = new Customer("1", "John");
      customer.changeName("");

    }).toThrow("Name is required");
  })

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    customer.setAddress(new Address("Street", 1, "00000-000", "City"));
    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("should throw error when activate customer without address", () => {

    expect(() => {
      const customer = new Customer("1", "John");
      customer.activate();
    }).toThrow("Address is required");

  })

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "John");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10.3 );

    expect(customer.rewardPoints).toBe(20);
  })
}) 