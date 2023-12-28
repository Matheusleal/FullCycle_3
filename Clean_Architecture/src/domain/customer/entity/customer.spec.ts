import Address from "./value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

  it("should notify when id is empty", () => {
    const customer = new Customer("", "John");

    console.log(customer.getMessages());

    expect(customer.isValid).toBeFalsy();
    expect(customer.getMessages()).toEqual("customer: Id is required");
  })

  it("should notify when name is empty", () => {
    const customer = new Customer("1", "");

    expect(customer.isValid).toBeFalsy()
    expect(customer.getMessages()).toEqual("customer: Name is required");
  })

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  })

  it("should notify when change name with an empty name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("");

    expect(customer.isValid).toBeFalsy();
    expect(customer.getMessages()).toEqual("customer: Name is required");
  })

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    customer.setAddress(new Address("Street", 1, "00000-000", "City"));
    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("should notify when activate customer without address", () => {
    const customer = new Customer("1", "John");
    customer.activate();

    expect(customer.isValid).toBeFalsy()
    expect(customer.getMessages()).toEqual("customer: Address is required");

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