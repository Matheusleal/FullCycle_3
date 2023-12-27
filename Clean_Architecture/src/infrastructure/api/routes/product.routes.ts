import express, { Request, Response } from "express"

import ProductRepository from "../../product/repository/product.repository"

import CreateProductUseCase from "../../../use_case/product/create/create.product.usecase"
import ListProductUseCase from "../../../use_case/product/list/list.product.usecase"

export const productRoutes = express.Router()

productRoutes.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository())

  try {

    const output = await useCase.execute({
      name: req.body.name,
      price: req.body.price
    })

    res.send(output)
  }
  catch (error) {
    res.status(500).send({ error: error })
  }
})

productRoutes.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await useCase.execute({})

    res.send(output)

  }
  catch (error) {

    res.status(500).send({ error: error })
  }
})