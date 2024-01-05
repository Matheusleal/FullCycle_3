import Id from "../../../@shared/domain/value-object/id.value-object"
import IUseCase from "../../../@shared/usecase/usecase.interface"
import Product from "../../domain/product.entity"
import IProductGateway from "../../gateway/product.gateway.interface"

import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto"

export default class AddProductUseCase implements IUseCase<AddProductInputDto, AddProductOutputDto> {

  private _gateway: IProductGateway

  constructor(gateway: IProductGateway) {
    this._gateway = gateway
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {

    const product = new Product({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock
    })

    await this._gateway.add(product)

    const output: AddProductOutputDto = {
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }

    return output

  }
}