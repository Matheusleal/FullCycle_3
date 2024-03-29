import ProductGateway from "../gateway/product.gateway.interface"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

import ProductModel from "./product.model"

export default class ProductRepository implements ProductGateway {
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
      rejectOnEmpty: true
    })

    if(!product) {
      throw new Error(`Product with id ${id} not found`)
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map(product =>
      new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })
    )
  }
}