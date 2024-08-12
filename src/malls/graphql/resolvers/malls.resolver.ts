import { Args, Query, Resolver } from '@nestjs/graphql'
import { Mall } from '../models/mall'
import { ListMallUsecase } from '@/malls/usecases/list-mall.usecase'
import { Inject } from '@nestjs/common'
import { SearchParamsArgs } from '../args/search-params.args'
import { SearchMallsResult } from '../models/search-malls-result'

@Resolver(() => Mall)
export class MallsResolver {
  @Inject(ListMallUsecase.Usecase)
  private listMallUseCase: ListMallUsecase.Usecase

  @Query(() => SearchMallsResult)
  async malls(
    @Args() { page, perPage, sort, sortDir, filter }: SearchParamsArgs,
  ) {
    const list = await this.listMallUseCase.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
    })
    return list
  }
}
