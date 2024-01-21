import {
  AddProductFacadeInputDto,
  AddProductFacadeOutputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from "./product-admin.facade.dto"
import IProductAdmFacade from "./product-admin.facade.interface"
import IUseCase from "../../@shared/usecase/usecase.interface"

export interface ProductAdmFacadeProps {
  addUserUseCase: IUseCase<AddProductFacadeInputDto, AddProductFacadeOutputDto>
  checkStockUseCase: IUseCase<CheckStockFacadeInputDto, CheckStockFacadeOutputDto>
}

export default class ProductAdmFacade implements IProductAdmFacade {

  private _addUserUseCase: IUseCase<AddProductFacadeInputDto, AddProductFacadeOutputDto>
  private _checkStockUseCase: IUseCase<CheckStockFacadeInputDto, CheckStockFacadeOutputDto>
 
  constructor(usecaseProps : ProductAdmFacadeProps) {
    this._addUserUseCase = usecaseProps.addUserUseCase
    this._checkStockUseCase = usecaseProps.checkStockUseCase
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
    return this._addUserUseCase.execute(input)
  }
  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input)
  }
}