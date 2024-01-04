export interface FindStoreCatalogFacadeInputDto {
  id: string
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllProductsInputDto {

}

export interface FindAllProductsOutputDto {
  products: FindAllProductSingleDto[]
}

export interface FindAllProductSingleDto {
  id: string
  name: string
  description: string
  salesPrice: number
}