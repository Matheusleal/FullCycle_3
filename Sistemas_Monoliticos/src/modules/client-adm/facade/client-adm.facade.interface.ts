import {
  AddClientInputDto,
  AddClientOutputDto,
  FindClientInputDto,
  FindClientOutputDto
} from "./client-adm.facade.dto"

export interface ClientAdmFacadeInterface {
  add(input: AddClientInputDto): Promise<AddClientOutputDto>
  find(input: FindClientInputDto): Promise<FindClientOutputDto>
}