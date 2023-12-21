import UpdateProductUseCase from "./update.product.usecase"
import ProductFactory from "../../../domain/product/factory/product.factory"

const productMock = ProductFactory.create("Product 1", 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(productMock)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test Update Product Use Case', () => {

  it('should update a product', async () => {
    const productRepository = MockRepository()
    const useCase = new UpdateProductUseCase(productRepository)

    const product = productMock

    const input = {
      id: product.id,
      name: "Product 1 Updated",
      price: 20
    }

    const output = await useCase.execute(input)

    expect(output).toEqual(input)

  })

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository()
    const useCase = new UpdateProductUseCase(productRepository)

    const product = productMock

    const input = {
      id: product.id,
      name: "",
      price: 20
    }

    await expect(useCase.execute(input)).rejects.toThrow("Name is required")
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = MockRepository()
    const useCase = new UpdateProductUseCase(productRepository)

    const product = productMock

    const input = {
      id: product.id,
      name: "Product 1 Updated",
      price: -1
    }

    await expect(useCase.execute(input)).rejects.toThrow("Price cannot be negative")
  })
})