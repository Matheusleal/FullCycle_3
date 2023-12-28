import Notification, { NotificationErrorProps } from "../notification/notification";
import AggregateRootInterface from "../domain/aggregate_root.interface";

export default abstract class Entity extends AggregateRootInterface {
  private _id: string;
  protected notification: Notification = new Notification();

  constructor() {
    super();
  }

  get id() { return this._id }
  get isValid() { return !this.notification.hasErrors() }

  protected set id(id: string) { this._id = id }

  getMessages(): string {
    return this.notification.messages()
  }

  getErrors(): NotificationErrorProps[] {
    return this.notification.getErrors()
  }
}