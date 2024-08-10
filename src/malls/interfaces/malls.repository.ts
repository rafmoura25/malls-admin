import { Mall } from '../graphql/models/mall'
import { ICreateMall } from './create-mall'

export interface IMallsRepository {
  create(data: ICreateMall): Promise<Mall>
  update(author: Mall): Promise<Mall>
  delete(id: string): Promise<Mall>
  findById(id: string): Promise<Mall>
  findByEmail(email: string): Promise<Mall>
  search(params: any): Promise<any>
  get(id: string): Promise<Mall>
}
