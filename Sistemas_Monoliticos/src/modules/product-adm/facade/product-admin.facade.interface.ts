import {
  AddProductFacadeInputDto,
  AddProductFacadeOutputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from "./product-admin.facade.dto";

export default interface IProductAdmFacade {
  addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto>
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
}