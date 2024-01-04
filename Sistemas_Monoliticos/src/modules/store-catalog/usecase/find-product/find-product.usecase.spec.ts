import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"

import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 10
})

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn()
  }
}

describe("FindProductUsecase unit test", () => {

  it("should find a product", async () => {
    const productRepository = mockRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input: FindProductInputDto = {
      id: "1"
    }

    const output = await usecase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()

    expect(output.id).toBe(product.id.value)
    expect(output.name).toBe(product.name)
    expect(output.description).toBe(product.description)
    expect(output.salesPrice).toBe(product.salesPrice)

  })
})