import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe('ProductRepository test', () => {
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

  it("should find all products", async () => {

    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 10
    })

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 20
    })

    const productRepository = new ProductRepository()

    const products = await productRepository.findAll()

    expect(products).toHaveLength(2)

    const [product1, product2] = products

    expect(product1.id.value).toBe('1')
    expect(product1.name).toBe('Product 1')
    expect(product1.description).toBe('Product 1 description')
    expect(product1.salesPrice).toBe(10)

    expect(product2.id.value).toBe('2')
    expect(product2.name).toBe('Product 2')
    expect(product2.description).toBe('Product 2 description')
    expect(product2.salesPrice).toBe(20)
  })

  it("should find a product", async () => {

    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 10
    })

    const productRepository = new ProductRepository()

    const product = await productRepository.find('1')

    expect(product.id.value).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product 1 description')
    expect(product.salesPrice).toBe(10)
  })
})
