import { Sequelize } from "sequelize-typescript"

import ProductModel from "../../../infrastructure/product/repository/product.model"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"

import ProductFactory from "../../../domain/product/factory/product.factory"

import ListProductUseCase from "./list.product.usecase"
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

  it('should list products', async () => {

    const productRepository = new ProductRepository();
    const list_useCase = new ListProductUseCase(productRepository)

    const product1 = ProductFactory.create("Product 1", 10 )
    const product2 = ProductFactory.create("Product 2", 20 )

    await productRepository.create(product1)
    await productRepository.create(product2)

    const output = await list_useCase.execute({})

    const expectedModels: Product[] = output.products.map(product => {
      return new Product(product.id, product.name, product.price)
    })

    expect(expectedModels).toEqual([product1, product2])
  })
})