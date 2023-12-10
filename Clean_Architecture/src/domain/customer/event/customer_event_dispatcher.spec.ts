import EventDispatcher from "../../@shared/event/event_dispatcher"
import Customer from "../entity/customer";
import Address from "../entity/value-object/address";
import CustomerCreatedEvent from "./customer_created_event";
import EnviaConsoleLogHandler from "./handler/envia_console_log.handler";
import EnviaConsoleLog1Handler from "./handler/envia_console_log_1.handler";
import EnviaConsoleLog2Handler from "./handler/envia_console_log_2.handler";

describe("Customer domain events tests", () => {


  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedHandler = new EnviaConsoleLogHandler();

    const createdCustomerHandler1 = new EnviaConsoleLog1Handler();
    const createdCustomerHandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler1);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressChangedHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(createdCustomerHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(createdCustomerHandler2);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedHandler = new EnviaConsoleLogHandler();

    const createdCustomerHandler1 = new EnviaConsoleLog1Handler();
    const createdCustomerHandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler1);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressChangedHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(createdCustomerHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(createdCustomerHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", createdCustomerHandler1);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedHandler = new EnviaConsoleLogHandler();

    const createdCustomerHandler1 = new EnviaConsoleLog1Handler();
    const createdCustomerHandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler1);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressChangedHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(createdCustomerHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(createdCustomerHandler2);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBe(undefined);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBe(undefined);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const customerAddressChangedHandler = new EnviaConsoleLogHandler();
    const createdCustomerHandler1 = new EnviaConsoleLog1Handler();
    const createdCustomerHandler2 = new EnviaConsoleLog2Handler();

    const spyChangedEventHandler = jest.spyOn(customerAddressChangedHandler, "handle");
    const spyCreatedEventHandler1 = jest.spyOn(createdCustomerHandler1, "handle");
    const spyCreatedEventHandler2 = jest.spyOn(createdCustomerHandler2, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler1);
    eventDispatcher.register("CustomerCreatedEvent", createdCustomerHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressChangedHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(createdCustomerHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(createdCustomerHandler2);

    const customer = new Customer("123", "Customer 1");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    customer.setAddress(new Address("Street 1", 1, "Zipcode 1", "City 1"));

    customer.getEvents().forEach(event => {
      eventDispatcher.notify(event);
    })

    expect(spyChangedEventHandler).toHaveBeenCalled();
    expect(spyCreatedEventHandler1).toHaveBeenCalled();
    expect(spyCreatedEventHandler2).toHaveBeenCalled();
  })
})