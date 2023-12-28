import { Sequelize } from "sequelize-typescript"

import ProductModel from "../../../infrastructure/product/repository/product.model"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"

import ProductFactory from "../../../domain/product/factory/product.factory"

import FindProductUseCase from "./find.product.usecase"
import Product from "../../../domain/product/entity/product"

describe('List Product integration Test', () => {
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
  }, 10000);

  afterEach(async () => {
    await sequelize.close();
  })

  it('should find a product', async () => {

    const productRepository = new ProductRepository();
    const find_useCase = new FindProductUseCase(productRepository)

    const product = ProductFactory.create("Product 1", 10 )

    await productRepository.create(product)

    const output = await find_useCase.execute({id : product.id})

    const expectedModel: Product = new Product(output.id, product.name, product.price)

    expect(expectedModel).toEqual(product)
  })
})