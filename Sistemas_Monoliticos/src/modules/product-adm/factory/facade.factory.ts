import IProductAdmFacade from "../facade/product-admin.facade.interface";
import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";

import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create(): IProductAdmFacade {

    const productRepository = new ProductRepository()

    const productAdmFacade = new ProductAdmFacade({
      addUserUseCase: new AddProductUseCase(productRepository),
      checkStockUseCase: new CheckStockUseCase(productRepository)
    })

    return productAdmFacade
  }
}
