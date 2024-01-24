export enum StatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined'
}

export default class Status {
  private _value: StatusEnum

  private constructor(value: string) {
    this._value = StatusEnum[value.toUpperCase() as keyof typeof StatusEnum]
  }

  get value(): string { return this._value }

  public static create(): Status {
    return new Status(StatusEnum.PENDING)
  }
  public static createFromEnum(value: StatusEnum): Status {
    return new Status(value)
  }
  public static createFromString(value: string): Status {

    switch (value) {
      case StatusEnum.PENDING:
        return new Status(StatusEnum.PENDING)
      case StatusEnum.APPROVED:
        return new Status(StatusEnum.APPROVED)
      case StatusEnum.DECLINED:
        return new Status(StatusEnum.DECLINED)
      default:
        return new Status(StatusEnum.PENDING)
    }
  }
}