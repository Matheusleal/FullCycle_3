import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  }, 11000)

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City"
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("John")
    expect(response.body.address.street).toBe("Street 1")
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe("12345")
    expect(response.body.address.city).toBe("City")
  })

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
      })

    expect(response.status).toBe(500)
  })

  it("should list all customers", async () => {

    const response1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City"
        }
      })

    expect(response1.status).toBe(200)

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          number: 1233,
          zip: "123435",
          city: "City2"
        }
      })

    expect(response2.status).toBe(200)

    const responseList = await request(app)
      .get("/customer")
      .send()

    expect(responseList.status).toBe(200)
    expect(responseList.body.customers.length).toBe(2)

    expect(responseList.body.customers[0].name).toBe("John")
    expect(responseList.body.customers[0].address.street).toBe("Street 1")

    expect(responseList.body.customers[1].name).toBe("Jane")
    expect(responseList.body.customers[1].address.street).toBe("Street 2")

    const responseListXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send()

    expect(responseListXML.status).toBe(200)
    expect(responseListXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(responseListXML.text).toContain("<customers>")
    expect(responseListXML.text).toContain("<customer>")
    expect(responseListXML.text).toContain("<name>John</name>")
    expect(responseListXML.text).toContain("<address>")
    expect(responseListXML.text).toContain("<street>Street 1</street>")
    expect(responseListXML.text).toContain("<number>123</number>")
    expect(responseListXML.text).toContain("<zip>12345</zip>")
    expect(responseListXML.text).toContain("<city>City</city>")
  })
})