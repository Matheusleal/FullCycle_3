import Product from "../../../domain/product/entity/product";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductMapper {

  static toOutput(products: Product[]): OutputListProductDto {

    var output: OutputListProductDto = {
      products: products?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }

    return output
  }

}