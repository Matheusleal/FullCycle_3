import { Sequelize } from "sequelize-typescript"

import ClientModel from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

describe('Client Repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  }, 11000)

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const clientRepository = new ClientRepository()

    const client = new Client({
      name: 'Client 1',
      email: 'client_1@me.com',
      address: 'Client 1 address',
    })

    await clientRepository.add(client)

    const result = await ClientModel.findOne({ where: { id: client.id.value } })

    expect(result).toBeDefined()
    expect(result?.id).toBe(client.id.value)
    expect(result.name).toBe(client.name)
    expect(result.email).toBe(client.email)
    expect(result.address).toBe(client.address)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()

  })

  it('should find a client', async () => {
    const clientRepository = new ClientRepository()

    const clientId = new Id()

    ClientModel.create({
      id: clientId.value,
      name: 'Client 1',
      email: 'client_1@me.com',
      address: 'Client 1 address',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await clientRepository.find(clientId.value)

    expect(result.id.value).toBe(clientId.value)
    expect(result.name).toBe('Client 1')
    expect(result.email).toBe('client_1@me.com')
    expect(result.address).toBe('Client 1 address')
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()

  })
})