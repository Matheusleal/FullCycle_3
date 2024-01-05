import IUseCase from "../../../@shared/usecase/usecase.interface"
import IClientGateway from "../../gateway/client.gateway"
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto"

export default class FindClientUseCase implements IUseCase<FindClientInputDto, FindClientOutputDto> {

  private _repository: IClientGateway

  constructor(repository: IClientGateway) {
    this._repository = repository
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const result = await this._repository.find(input.id)

    if(!result) throw new Error("Client not found")

    const output: FindClientOutputDto = {
      id: result.id.value,
      name: result.name,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }

    return output
  }
}