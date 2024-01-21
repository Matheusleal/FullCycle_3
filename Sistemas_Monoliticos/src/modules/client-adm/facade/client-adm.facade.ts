import {
  AddClientInputDto,
  AddClientOutputDto,
  FindClientInputDto,
  FindClientOutputDto
} from './client-adm.facade.dto'

import IUseCase from '../../@shared/usecase/usecase.interface'

export interface IClientAdmFacadeProps {
  addUseCase: IUseCase<AddClientInputDto, AddClientOutputDto>
  findUseCase: IUseCase<FindClientInputDto, FindClientOutputDto>
}

export default class ClientAdmFacade {
  private _addUseCase: IUseCase<AddClientInputDto, AddClientOutputDto>
  private _findUseCase: IUseCase<FindClientInputDto, FindClientOutputDto>

  constructor(usecaseProps: IClientAdmFacadeProps) {
    this._addUseCase = usecaseProps.addUseCase
    this._findUseCase = usecaseProps.findUseCase
  }

  async add(input: AddClientInputDto): Promise<AddClientOutputDto> {
    return this._addUseCase.execute(input)
  }

  async find(input: FindClientInputDto): Promise<FindClientOutputDto> {
    return this._findUseCase.execute(input)
  }
}