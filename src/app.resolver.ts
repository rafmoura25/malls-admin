import { AppService } from './app.service'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'Olá Dev'
  }
}
