import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Mall {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  address: string

  @Field()
  isActive: boolean

  @Field()
  createdAt: Date
}
