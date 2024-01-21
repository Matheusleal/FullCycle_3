import IClientGateway from "../gateway/client.gateway"
import ClientModel from "./client.model"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
export default class ClientRepository implements IClientGateway {

  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    })
  }

  async find(id: string): Promise<Client> {
    const result = await ClientModel.findOne({ where: { id } })

    if (!result) throw new Error("Client not found")

    return new Client(
      {
        id: new Id(result.id),
        name: result.name,
        email: result.email,
        address: result.address,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      })
  }
}