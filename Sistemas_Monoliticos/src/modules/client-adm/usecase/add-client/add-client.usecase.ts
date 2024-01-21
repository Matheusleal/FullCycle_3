import IUseCase from "../../../@shared/usecase/usecase.interface"
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto"
import IClientGateway from "../../gateway/client.gateway"
import Client from "../../domain/client.entity"
import Id from "../../../@shared/domain/value-object/id.value-object"
export default class AddClientUseCase implements IUseCase<AddClientInputDto, AddClientOutputDto> {

  private _repository: IClientGateway

  constructor(repository: IClientGateway) {
    this._repository = repository
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

    const client = new Client({
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address
    })

    await this._repository.add(client)

    const output: AddClientOutputDto = {
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }

    return output
  }
}