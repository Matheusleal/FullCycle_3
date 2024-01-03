import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUseCase from "./find-all-products-usecase"


const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 10
})

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  salesPrice: 20
})

const mockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
  }
}

describe("FindAllProductsUsecase unit test", () => {

  it("should find all products", async () => {

    var productRepository = mockRepository()

    const usecase = new FindAllProductsUseCase(productRepository)

    const output = await usecase.execute({})

    expect(productRepository.findAll).toHaveBeenCalled()
    expect(output.products.length).toBe(2)

    const [productOutput1, productOutput2] = output.products

    expect(productOutput1.id).toBe(product.id.value)
    expect(productOutput1.name).toBe(product.name)
    expect(productOutput1.description).toBe(product.description)
    expect(productOutput1.salesPrice).toBe(product.salesPrice)

    expect(productOutput2.id).toBe(product2.id.value)
    expect(productOutput2.name).toBe(product2.name)
    expect(productOutput2.description).toBe(product2.description)
    expect(productOutput2.salesPrice).toBe(product2.salesPrice)

  })
})