import Id from "../../@shared/domain/value-object/id.value-object";
import Product, { ProductProps } from "../domain/product.entity";
import IProductGateway from "../gateway/product.gateway.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements IProductGateway {

  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }
  async find(id: Id): Promise<Product> {

    const result = await ProductModel.findOne({
      where: { id : id.value },
      rejectOnEmpty: true
    },)

    if (!result) {
      throw new Error(`Product with id ${id} not found`)
    }

    return new Product({
      id: new Id(result.id),
      name: result.name,
      description: result.description,
      purchasePrice: result.purchasePrice,
      stock: result.stock
    })
  }
}