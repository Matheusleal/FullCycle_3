import { FindAllProductsInputDto, FindAllProductsOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.dto"

export default interface IStoreCatalogFacade {
  find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
  findAll(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto>
}