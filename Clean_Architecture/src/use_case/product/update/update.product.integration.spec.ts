import { Sequelize } from "sequelize-typescript"

import ProductModel from "../../../infrastructure/product/repository/product.model"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"

import ProductFactory from "../../../domain/product/factory/product.factory"

import UpdateProductUseCase from "./update.product.usecase"

describe('Update Product integration Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should update products', async () => {

    const productRepository = new ProductRepository();
    const update_useCase = new UpdateProductUseCase(productRepository)

    const product = ProductFactory.create("Product 1", 10 )
    await productRepository.create(product)

    const output = await update_useCase.execute({
      id: product.id,
      name: "Product 12",
      price: 20
    })


    expect(output).toEqual({
      id: product.id,
      name: "Product 12",
      price: 20
    })
  })
})