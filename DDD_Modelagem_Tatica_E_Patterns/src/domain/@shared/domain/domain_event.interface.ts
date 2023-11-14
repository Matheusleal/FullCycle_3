import EventInterface from "../event/event.interface"

export default interface DomainEventInterface extends EventInterface {

  aggregateId: string;
}