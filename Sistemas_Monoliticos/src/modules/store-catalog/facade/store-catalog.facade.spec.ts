import { Sequelize } from "sequelize-typescript"

import ProductModel from "../repository/product.model"
import StoreCatalogFacadeFactory from "../factory/facade.factory"
import { FindProductInputDto } from "../usecase/find-product/find-product.dto"
import { FindAllProductsInputDto } from "./store-catalog.facade.dto"


describe('Store Catalog Facade test', () => {

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

  it('should find a product', async () => {

    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100
    })

    const StoreFacade = StoreCatalogFacadeFactory.create()

    const input: FindProductInputDto = {
      id: '1'
    }

    const output = await StoreFacade.find(input)

    expect(output.id).toBe(input.id)
    expect(output.name).toBe('Product 1')
    expect(output.description).toBe('Product 1 description')
    expect(output.salesPrice).toBe(100)
  })

  it('should find all products', async () => {

    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100
    })

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 200
    })

    const storeFacade = StoreCatalogFacadeFactory.create()

    const input: FindAllProductsInputDto = {}

    const output = await storeFacade.findAll(input)

    expect(output.products.length).toBe(2)

    const [productOutput1, productOutput2] = output.products

    expect(productOutput1.id).toBe('1')
    expect(productOutput1.name).toBe('Product 1')
    expect(productOutput1.description).toBe('Product 1 description')
    expect(productOutput1.salesPrice).toBe(100)

    expect(productOutput2.id).toBe('2')
    expect(productOutput2.name).toBe('Product 2')
    expect(productOutput2.description).toBe('Product 2 description')
    expect(productOutput2.salesPrice).toBe(200)
  })
})