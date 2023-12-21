import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputListProductDto, OutputListProductDto } from "./list.product.dto"
import ListProductUseCase from "./list.product.usecase"

const productMock1 = ProductFactory.create("Product 1", 10)
const productMock2 = ProductFactory.create("Product 2", 20)

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productMock1, productMock2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('List Product Use Case', () => {

  it('should list a product', async () => {
    const productRepository = MockProductRepository()
    const useCase = new ListProductUseCase(productRepository)

    const input: InputListProductDto = {

    }

    const expectedOutput: OutputListProductDto = {
      products: [
        {
          id: productMock1.id,
          name: "Product 1",
          price: 10
        },
        {
          id: productMock2.id,
          name: "Product 2",
          price: 20
        }
      ]
    }

    const result = await useCase.execute(input)

    expect(result.products.length).toBe(2)

    expect(result.products[0].id).toEqual(expectedOutput.products[0].id)
    expect(result.products[0].name).toEqual(expectedOutput.products[0].name)
    expect(result.products[0].price).toEqual(expectedOutput.products[0].price)

    expect(result.products[1].id).toEqual(expectedOutput.products[1].id)
    expect(result.products[1].name).toEqual(expectedOutput.products[1].name)
    expect(result.products[1].price).toEqual(expectedOutput.products[1].price)
  })

})
