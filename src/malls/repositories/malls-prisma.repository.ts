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

  async create(data: ICreateMall): Promise<Mall> {
    const mall = await this.prisma.mall.create({
      data,
    })
    return mall
  }

  async update(mall: Mall): Promise<Mall> {
    await this.get(mall.id)
    const mallUpdated = await this.prisma.mall.update({
      data: mall,
      where: {
        id: mall.id,
      },
    })
    return mall
  }

  async delete(id: string): Promise<Mall> {
    const mall = await this.get(id)
    await this.prisma.mall.delete({
      where: { id },
    })
    return mall
  }

  async findById(id: string): Promise<Mall> {
    return await this.get(id)
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const { page = 1, perPage = 15, filter, sort, sortDir } = params
    const sortable = this.sortableFields?.includes(sort) || false
    const orderByField = sortable ? sort : 'createdAt'
    const orderByDir = sortable ? sortDir : 'desc'

    const count = await this.prisma.mall.count({
      ...(filter && {
        where: { name: { contains: filter, mode: 'insensitive' } },
      }),
    })

    const malls = await this.prisma.mall.findMany({
      ...(filter && {
        where: { name: { contains: filter, mode: 'insensitive' } },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
    })

    return {
      items: malls,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(count / perPage),
      total: count,
    }
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
