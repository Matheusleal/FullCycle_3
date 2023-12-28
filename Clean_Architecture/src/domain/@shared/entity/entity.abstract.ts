import Notification, { NotificationErrorProps } from "../notification/notification";
import AggregateRootInterface from "../domain/aggregate_root.interface";

export default abstract class Entity extends AggregateRootInterface {
  private _id: string;
  private _notification: Notification = new Notification();

  constructor() {
    super();
  }

  get id() { return this._id }
  get isValid() { return !this._notification.hasErrors() }
  get notification() { return this._notification }

  protected set id(id: string) { this._id = id }

  getMessages(): string {
    return this._notification.messages()
  }

  getErrors(): NotificationErrorProps[] {
    return this._notification.getErrors()
  }
}