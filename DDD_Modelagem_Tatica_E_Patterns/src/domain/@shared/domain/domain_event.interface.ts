export default interface DomainEventInterface {
  aggregateId: string
  occurredOn: Date
  eventVersion: number
}