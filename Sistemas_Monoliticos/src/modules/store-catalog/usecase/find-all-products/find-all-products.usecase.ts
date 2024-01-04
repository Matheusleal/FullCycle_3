import IUseCase from "../../../@shared/usecase/usecase.interface"

import IProductGateway from "../../gateway/product.gateway.interface"
import { FindAllProductsInputDto, FindAllProductsOutputDto } from "./find-all-products.dto"

export default class FindAllProductsUseCase implements IUseCase<FindAllProductsInputDto, FindAllProductsOutputDto> {
  private _gateway: IProductGateway

  constructor(gateway: IProductGateway) {
    this._gateway = gateway
  }

  async execute(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
    const products = await this._gateway.findAll()

    if(!products) {
      throw new Error("Product not found")
    }

    const output: FindAllProductsOutputDto = {
      products : products.map(product => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }

    return output
  }

}