export class InputListProductDto {

}

export class OutputListProductDto {
  products: ProductDto[]
}

export class ProductDto {
  id: string
  name: string
  price: number
}