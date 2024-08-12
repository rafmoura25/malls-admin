import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateMallInput {
  @Field()
  name: string

  @Field()
  address: string

  @Field()
  isActive: boolean
}
