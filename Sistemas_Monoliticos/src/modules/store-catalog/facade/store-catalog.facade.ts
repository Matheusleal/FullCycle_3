import IUseCase from "../../@shared/usecase/usecase.interface"
import { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, FindAllProductsInputDto, FindAllProductsOutputDto } from "./store-catalog.facade.dto"
import IStoreCatalogFacade from "./store-catalog.facade.interface"

interface StoreCatalogFacadeProps {
  findUseCase: IUseCase<FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto>
  findAllUseCase: IUseCase<FindAllProductsInputDto, FindAllProductsOutputDto>
}

export default class StoreCatalogFacade implements IStoreCatalogFacade {

  private _findUseCase: IUseCase<FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto>
  private _findAllUseCase: IUseCase<FindAllProductsInputDto, FindAllProductsOutputDto>

  constructor(storeCatalogFacadeProps: StoreCatalogFacadeProps) {
    this._findUseCase = storeCatalogFacadeProps.findUseCase
    this._findAllUseCase = storeCatalogFacadeProps.findAllUseCase
  }

  find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(input)
  }
  findAll(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
    return this._findAllUseCase.execute(input)
  }

}