import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import Customer from "../../entity/customer";

export default class EnviaConsoleLogHandler implements EventHandlerInterface {

  handle(event: EventInterface): void {

    const { eventData } = event;

    if (eventData instanceof Customer) {

      console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`)
    }
  }
}