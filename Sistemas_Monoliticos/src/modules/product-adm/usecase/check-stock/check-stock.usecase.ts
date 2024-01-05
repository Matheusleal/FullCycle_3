import Id from "../../../@shared/domain/value-object/id.value-object"
import IUseCase from "../../../@shared/usecase/usecase.interface"

import IProductGateway from "../../gateway/product.gateway.interface"
import { CheckStockInputDto, CheckStockOutputDto } from "./check.stock.dto"

export default class CheckStockUseCase implements IUseCase<CheckStockInputDto, CheckStockOutputDto> {
  private _gateway: IProductGateway

  constructor(gateway: IProductGateway) {
    this._gateway = gateway
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {

    const product = await this._gateway.find(new Id(input.productId))

    if (!product) {
      throw new Error("Product not found")
    }

    return {
      productId: product.id.value,
      stock: product.stock
    }
  }

}