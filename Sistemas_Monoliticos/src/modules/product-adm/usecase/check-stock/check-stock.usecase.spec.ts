import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";
import { CheckStockInputDto } from "./check.stock.dto";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 100,
  stock: 10
})

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('Check Stock Usecase unit test', () => {

  it("should check stock", async () => {
    const productRepository = mockRepository()

    const usecase = new CheckStockUseCase(productRepository)

    const input: CheckStockInputDto = {
      productId: "1"
    }

    const output = await usecase.execute(input)

    expect(output).toBeDefined()
    expect(output.productId).toBe(product.id.value)
    expect(output.stock).toBe(product.stock)
  })

})