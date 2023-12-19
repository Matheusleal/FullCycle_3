import CreateProductUseCase from "./create.product.usecase"

const MockProductModel = () => {
  const product = {
    name: "Product 1",
    price: 10
  }
  return product
}
const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test create Product Use Case', () => {

  it('should create a product', async () => {
    const productRepository = MockProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const input = MockProductModel()
    const output = await useCase.execute(input)

    const expectedOutput = {
      id: expect.any(String),
      ...input,
    }

    expect(output).toEqual(expectedOutput)
  })

  it('should throw an error when product name is missing', async () => {
    const productRepository = MockProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const input = MockProductModel()
    input.name = ""

    await expect(useCase.execute(input)).rejects.toThrow("Name is required")
  })

  it('should throw an error when product price is missing', async () => {
    const productRepository = MockProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const input = MockProductModel()
    input.price = -1

    await expect(useCase.execute(input)).rejects.toThrow("Price cannot be negative")
  })
})