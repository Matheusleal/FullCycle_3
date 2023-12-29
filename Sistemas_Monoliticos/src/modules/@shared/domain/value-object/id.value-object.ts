import { v4 as uuidv4 } from 'uuid'

import IValueObject from './value-object.interface'

export default class Id implements IValueObject<string> {

  private _value: string

  constructor(value?: string) {
    this._value = value || uuidv4()
  }

  get value(): string { return this._value }

  equals(other: string): boolean {
    throw new Error('Method not implemented.');
  }

}