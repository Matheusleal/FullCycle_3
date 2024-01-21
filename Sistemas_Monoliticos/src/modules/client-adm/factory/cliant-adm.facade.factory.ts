import ClientAdmFacade from "../facade/client-adm.facade"
import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository()
    const clientAddUseCase = new AddClientUseCase(clientRepository)
    const clientFindUseCase = new FindClientUseCase(clientRepository)

    return new ClientAdmFacade({
      addUseCase: clientAddUseCase,
      findUseCase: clientFindUseCase
    })

  }
}