import DomainEventInterface from "./domain_event.interface";

export default abstract class AggregateRootInterface {

  private _events: Set<DomainEventInterface> = new Set();

  getEvents(): DomainEventInterface[] {
    return Array.from(this._events);
  }

  protected addEvent(event: DomainEventInterface) {
    this._events.add(event);
  }

  clearEvents() {
    this._events.clear();
  }
}