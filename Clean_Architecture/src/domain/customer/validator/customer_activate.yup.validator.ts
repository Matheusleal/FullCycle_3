import * as yup from "yup"

import ValidatorInterface from "../../@shared/validator/validator.interface"
import Customer from "../entity/customer"

export default class CustomerActivateYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {

    try {

      yup
        .object()
        .shape({
          address: yup.string().required("Address is required"),
        })
        .validateSync(
          {
            address: entity.address,
          },
          {
            abortEarly: false
          }
        )

    } catch (errors) {
        const e = errors as yup.ValidationError

        e.errors.forEach(error => {
          entity.notification.addError({
            context: "customer",
            message: error
          })
        })
    }

  }
}