import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto"

export default class CreateProductUseCase {
  private _productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

    const product = ProductFactory.create(input.name, input.price)

    await this._productRepository.create(product)

    var output : OutputCreateProductDto = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    return output
  }
}