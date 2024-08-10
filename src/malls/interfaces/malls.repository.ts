import { Mall } from '../graphql/models/mall'
import { ICreateMall } from './create-mall'

export type SearchParams = {
  page?: number
  perPage?: number
  filter?: string
  sort?: string
  sortDir?: 'asc' | 'desc'
}

export type SearchResult = {
  items: Mall[]
  currentPage: number
  perPage: number
  lastPage: number
  total: number
}

export interface IMallsRepository {
  sortableFields: string[]

  create(data: ICreateMall): Promise<Mall>
  update(author: Mall): Promise<Mall>
  delete(id: string): Promise<Mall>
  findById(id: string): Promise<Mall>
  search(params: SearchParams): Promise<SearchResult>
  get(id: string): Promise<Mall>
}
