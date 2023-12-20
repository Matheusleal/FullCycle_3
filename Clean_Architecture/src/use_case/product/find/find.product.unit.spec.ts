import { OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

const MockProductModel = () => {
  const product = {
    id: "1",
    name: "Product 1",
    price: 10
  }
  return product
}
const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(MockProductModel())),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Find Product Use Case', () => {
  it('should find a product', async () => {
    const productRepository = MockProductRepository()
    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: '1'
    }

    const expectedOutput: OutputFindProductDto = {
      id: '1',
      name: 'Product 1',
      price: 10
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(expectedOutput)

  })

  it('should not find a product', async () => {
    const productRepository = MockProductRepository()

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })

    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '2'
    }

    expect(async () => {
      return await usecase.execute(input)
    }).rejects.toThrow('Product not found')
  })
})
