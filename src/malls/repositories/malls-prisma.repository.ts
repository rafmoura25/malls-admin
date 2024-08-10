import { Mall } from '@prisma/client'
import { ICreateMall } from '../interfaces/create-mall'
import {
  IMallsRepository,
  SearchParams,
  SearchResult,
} from '../interfaces/malls.repository'
import { PrismaService } from '@/database/prisma/prisma.service'
import { NotFoundError } from '@/shared/errors/not-found-error'

export class MallsPrismaRepository implements IMallsRepository {
  sortableFields: string[] = ['name', 'address', 'isActive', 'createdAt']

  constructor(private prisma: PrismaService) {}
  create(data: ICreateMall): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  update(mall: Mall): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Mall> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Mall> {
    return await this.get(id)
  }
  search(params: SearchParams): Promise<SearchResult> {
    throw new Error('Method not implemented.')
  }
  async get(id: string): Promise<Mall> {
    const mall = await this.prisma.mall.findUnique({
      where: { id },
    })
    if (!mall) {
      throw new NotFoundError(`Mall not found using ID ${id}`)
    }
    return mall
  }
}
