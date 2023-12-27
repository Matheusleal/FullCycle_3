import express, {Request, Response} from "express"

import CustomerRepository from "../../customer/repository/customer.repository"
import CreateCustomerUseCase from "../../../use_case/customer/create/create.customer.usecase"
import { InputCreateCustomerDto } from "../../../use_case/customer/create/create.customer.dto"

export const customerRoutes = express.Router()

customerRoutes.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const reqDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city
      }
    }

    const output = await useCase.execute(reqDto)

    res.send(output)

  } catch ( er) {

    res.status(500).send({error: er})
  }
})
