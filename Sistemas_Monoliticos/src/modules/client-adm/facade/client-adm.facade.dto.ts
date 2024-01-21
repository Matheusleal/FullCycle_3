export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  address: string
}

export interface AddClientOutputDto {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface FindClientInputDto {
  id: string
}

export interface FindClientOutputDto {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}