import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"

import CustomerModel from "../customer/repository/customer.model"
import ProductModel from "../product/repository/product.model"

import { customerRoutes } from "./routes/customer.routes"
import { productRoutes } from "./routes/product.routes"

export const app: Express = express()

app.use(express.json())

app.use("/customer", customerRoutes)
app.use("/product", productRoutes)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  })
  await sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}
setupDb()