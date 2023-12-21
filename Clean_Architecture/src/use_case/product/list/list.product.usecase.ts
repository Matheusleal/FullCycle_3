import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface"
import { InputListProductDto, OutputListProductDto } from "./list.product.dto"
import ListProductMapper from "./list.product.mappers"

export default class ListProductUseCase {

  private _productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {

    const product = await this._productRepository.findAll()

    const result = ListProductMapper.toOutput(product)

    return result
  }
}