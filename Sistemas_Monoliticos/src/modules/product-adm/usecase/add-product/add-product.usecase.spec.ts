import { AddProductInputDto } from "./add-product.dto"

const MockRepository = () => {

  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('AddProduct Usecase unit test', () => {

  it("should add a product", async () => {
    //repository
    const repository = MockRepository()
    //usecase
    const usecase = new AddProductUsecase(repository)

    const input: AddProductInputDto = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    usecase.execute(input)
    //input

    //output
  })

})