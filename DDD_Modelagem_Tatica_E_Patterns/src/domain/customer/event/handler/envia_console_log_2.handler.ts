import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log("CustomerCreated")
  }
}