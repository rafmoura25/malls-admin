import { SearchInput } from '@/shared/dto/search-input'
import { MallOutput } from '../dto/mall-output'
import { MallsPrismaRepository } from '../repositories/malls-prisma.repository'
import { PaginationOutput } from '@/shared/dto/pagination-output'

export namespace ListMallUsecase {
  export type Input = SearchInput

  export type Output = PaginationOutput<MallOutput>

  export class Usecase {
    constructor(private mallsRepository: MallsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.mallsRepository.search(input)
      return {
        items: searchResult.items,
        total: searchResult.total,
        currentPage: searchResult.currentPage,
        perPage: searchResult.perPage,
        lastPage: searchResult.lastPage,
      }
    }
  }
}
