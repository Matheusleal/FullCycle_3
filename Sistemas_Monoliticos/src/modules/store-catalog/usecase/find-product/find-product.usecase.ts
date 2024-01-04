import IUseCase from "../../../@shared/usecase/usecase.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";
import IProductRepository from "../../repository/product.repository";
export default class FindProductUsecase implements IUseCase<FindProductInputDto, FindProductOutputDto> {

  private _repository: IProductRepository

  constructor(repository: IProductRepository) {
    this._repository = repository
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this._repository.find(input.id)

    const output: FindProductOutputDto = {
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }

    return output
  }
}
