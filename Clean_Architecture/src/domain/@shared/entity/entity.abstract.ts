import Notification from "../notification/notification";
import AggregateRootInterface from "../domain/aggregate_root.interface";

export default abstract class Entity extends AggregateRootInterface {
  private _id: string;
  protected notification: Notification;

  constructor() {
    super();
    this.notification = new Notification();
  }

  get id() {
    return this._id
  }

  protected set id(id: string) {
    this._id = id
  }
}