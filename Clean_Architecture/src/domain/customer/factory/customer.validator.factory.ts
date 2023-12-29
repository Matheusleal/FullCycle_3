import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";

import CustomerYupValidator from "../validator/customer.yup.validator";
import CustomerActivateYupValidator from "../validator/customer_activate.yup.validator";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}

export class CustomerActivateValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerActivateYupValidator()
  }
}