import DomainEventInterface from "../../@shared/domain/domain_event.interface";

export default class CustomerAddressChangedEvent implements DomainEventInterface {
  aggregateId: string;
  dateTimeOccurred: Date;
  eventData: any;

  constructor(aggregateId: string, eventData: any) {
    this.aggregateId = aggregateId;
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}