import { Sequelize } from "sequelize-typescript"

import ProductModel from "../repository/product.model"

import { AddProductFacadeInputDto } from "./product-admin.facade.dto"
import ProductAdmFacadeFactory from "../factory/facade.factory"
// import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase"

describe('Product Adm Facade test', () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  }, 11000)

  afterEach(async () => {
    await sequelize.close()
  })

  it('should add a product', async () => {

    const productAdmFacade = ProductAdmFacadeFactory.create()

    const input: AddProductFacadeInputDto = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }

    const output = await productAdmFacade.addProduct(input)

    const product = await ProductModel.findOne({
      where: { id: output.id },
      rejectOnEmpty: true
    })

    expect(product).toBeDefined()
    expect(product.id).toBe(input.id)
    expect(product.name).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.purchasePrice).toBe(input.purchasePrice)
    expect(product.stock).toBe(input.stock)

  })
})