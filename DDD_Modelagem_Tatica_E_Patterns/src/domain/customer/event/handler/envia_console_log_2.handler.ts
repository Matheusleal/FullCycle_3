import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerAddressChangedEvent from "../customer_address_changed.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerAddressChangedEvent > {
  handle(event: EventInterface): void {
    console.log("CustomerCreated")
  }
}