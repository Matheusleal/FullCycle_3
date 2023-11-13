import DomainEventInterface from "./domain_event.interface";

export default abstract class AggregateRootInterface {

  events: Set<DomainEventInterface> = new Set();

  addEvent(event: DomainEventInterface) {
    this.events.add(event);
  }

  clearEvents() {
    this.events.clear();
  }
}