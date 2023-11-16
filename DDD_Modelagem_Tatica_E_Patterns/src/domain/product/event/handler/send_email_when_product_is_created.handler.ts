import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import ProductCreatedEvent from "../product_created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Sending email to ${event.eventData.id}...`)
  }

}