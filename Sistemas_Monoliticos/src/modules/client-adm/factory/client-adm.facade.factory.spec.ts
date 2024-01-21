import { Sequelize } from "sequelize-typescript"

import ClientAdmFacadeFactory from "./cliant-adm.facade.factory"

import Client from "../domain/client.entity"
import ClientModel from "../repository/client.model"

describe('Client Adm Facade factory test', () => {

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

    const facade = ClientAdmFacadeFactory.create()

    const input = {
      name: 'Client 1',
      email: 'client_1@me.com',
      address: 'Client 1 address',
    }

    const output = await facade.add(input)

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.address).toBe(input.address)

    const client = await ClientModel.findOne({ where: { id: output.id } })

    expect(client).toBeDefined()
    expect(client.id).toBe(output.id)
    expect(client.name).toBe(output.name)
    expect(client.email).toBe(output.email)
    expect(client.address).toBe(output.address)
    expect(client.createdAt).toStrictEqual(output.createdAt)
    expect(client.updatedAt).toStrictEqual(output.updatedAt)
  })

  it('should find a client', async () => {

    const facade = ClientAdmFacadeFactory.create()

    const input  = new Client({
      name: 'Client 1',
      email: 'client_1@me.com',
      address: 'Client 1 address',
    })

    await ClientModel.create({
      id: input.id.value,
      name: input.name,
      email: input.email,
      address: input.address,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })

    const output = await facade.find({ id: input.id.value })

    expect(output).toBeDefined()
    expect(output.id).toBe(input.id.value)
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.address).toBe(input.address)
    expect(output.createdAt).toStrictEqual(input.createdAt)
    expect(output.updatedAt).toStrictEqual(input.updatedAt)
  })
})