import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Mall } from './mall'

@ObjectType()
export class SearchMallsResult {
  @Field(() => [Mall])
  items: Mall[]

  @Field(() => Int)
  currentPage: number

  @Field(() => Int)
  perPage: number

  @Field(() => Int)
  lastPage: number

  @Field(() => Int)
  total: number
}
