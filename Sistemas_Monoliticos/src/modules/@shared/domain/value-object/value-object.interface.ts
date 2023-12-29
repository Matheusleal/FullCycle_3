export default interface IValueObject<T> {
  equals(other: T): boolean
}