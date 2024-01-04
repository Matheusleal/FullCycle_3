import ProductRepository from "../repository/product.repository"
import FindProductUseCase from "../usecase/find-product/find-product.usecase"
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase"
import StoreCatalogFacade from "../facade/store-catalog.facade"

export default class StoreCatalogFacadeFactory {
  static create() : StoreCatalogFacade {

    const productRepository = new ProductRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)

    const facade = new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase
    })

    return facade
  }
}