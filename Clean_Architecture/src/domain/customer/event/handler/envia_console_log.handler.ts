import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer_address_changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

  handle(event: EventInterface): void {
    const { eventData } = event;

    if (eventData instanceof Customer) {

      console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`)
    }
  }
}