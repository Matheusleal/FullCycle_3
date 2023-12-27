import Notification from "../notification/notification";
import AggregateRootInterface from "../domain/aggregate_root.interface";

export default abstract class Entity extends AggregateRootInterface {
  protected id: string;
  protected notification: Notification;

  constructor() {
    super();
    this.notification = new Notification();
  }
}