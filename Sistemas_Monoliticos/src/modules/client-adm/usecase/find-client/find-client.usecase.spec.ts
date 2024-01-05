import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto"

const mockClient = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client1@me.com",
  address: "client 1 address"
})

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(mockClient))
  }
}

describe("FindClientUseCase unit test", () => {

  it("should find a client", async () => {

    const repository = mockRepository()
    const usecase = new FindClientUseCase(repository)

    const input: FindClientInputDto = {
      id: "1"
    }

    const expectedOutput: FindClientOutputDto = {
      id: mockClient.id.value,
      name: mockClient.name,
      email: mockClient.email,
      address: mockClient.address,
      createdAt: mockClient.createdAt,
      updatedAt: mockClient.updatedAt
    }

    const output = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()

    expect(output.id).toBe(expectedOutput.id)
    expect(output.name).toBe(expectedOutput.name)
    expect(output.email).toBe(expectedOutput.email)
    expect(output.address).toBe(expectedOutput.address)
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()
  })
})