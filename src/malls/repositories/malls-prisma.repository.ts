import { Mall } from '@prisma/client'
import { ICreateMall } from '../interfaces/create-mall'
import {
  IMallsRepository,
  SearchParams,
  SearchResult,
} from '../interfaces/malls.repository'
import { PrismaService } from '@/database/prisma/prisma.service'

export class MallsPrismaRepository implements IMallsRepository {
  sortableFields: string[] = ['name', 'address', 'isActive', 'createdAt']

  constructor(private prisma: PrismaService) {}
  create(data: ICreateMall): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  update(author: Mall): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  search(params: SearchParams): Promise<SearchResult> {
    throw new Error('Method not implemented.')
  }
  get(id: string): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
}
