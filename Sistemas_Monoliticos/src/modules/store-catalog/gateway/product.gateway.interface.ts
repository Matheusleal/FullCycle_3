import Product from "../domain/product.entity"

export default interface IProductGateway {
  find(id: string): Promise<Product>
  findAll(): Promise<Product[]>
}