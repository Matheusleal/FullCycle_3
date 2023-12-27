import { Sequelize } from "sequelize-typescript"

import ProductModel from "../../../infrastructure/product/repository/product.model"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"

import ProductFactory from "../../../domain/product/factory/product.factory"

import CreateProductUseCase from "./create.product.usecase"
import Product from "../../../domain/product/entity/product"

describe('Create Product integration Test', () => {
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

  it('should create a product', async () => {

    const productRepository = new ProductRepository();
    const create_useCase = new CreateProductUseCase(productRepository)

    const product = ProductFactory.create("Product 1", 10 )

    const output = await create_useCase.execute({
      name: product.name,
      price: product.price
    })

    const expectedModel: Product = new Product(output.id, product.name, product.price)

    const productModel = await productRepository.find(output.id)

    expect(expectedModel).toEqual(productModel)
  })
})