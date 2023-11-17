import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerCreatedEvent from "../customer_created_event";


export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: EventInterface): void {
    console.log("CustomerCreated")
  }
}