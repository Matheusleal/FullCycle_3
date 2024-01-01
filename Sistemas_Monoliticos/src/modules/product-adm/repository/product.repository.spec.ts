import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductRepository from "./product.repository"


describe('Product Repository test', () => {
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

  it('should create a product', async () => {

    const productRepository = new ProductRepository()

    const product = new Product({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    })

    await productRepository.add(product)

    const result = await ProductModel.findOne({ where: { id: product.id.value } })

    console.table(result.id)

    expect(result.id).toEqual(product.id.value)
    expect(result.name).toEqual(product.name)
    expect(result.description).toEqual(product.description)
    expect(result.purchasePrice).toEqual(product.purchasePrice)
    expect(result.stock).toEqual(product.stock)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
  })

  it('should find a product', async () => {

    const productRepository = new ProductRepository()

    const product = new Product({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    })

    await productRepository.add(product)

    const result = await productRepository.find(product.id)

    expect(result.id.value).toEqual(product.id.value)
    expect(result.name).toEqual(product.name)
    expect(result.description).toEqual(product.description)
    expect(result.purchasePrice).toEqual(product.purchasePrice)
    expect(result.stock).toEqual(product.stock)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
  })
})