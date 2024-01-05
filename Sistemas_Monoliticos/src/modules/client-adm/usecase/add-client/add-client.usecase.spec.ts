import AddClientUseCase from "./add-client.usecase"
import { AddClientInputDto } from "./add-client.usecase.dto"

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("AddClientUseCase unit test", () => {

  it("should add a client", async () => {

    const repository = mockRepository()
    const usecase = new AddClientUseCase(repository)

    const input: AddClientInputDto = {
      name: "Client 1",
      email: "client1@me.com",
      address: "client 1 address"
    }

    const output = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.address).toBe(input.address)
  })
})