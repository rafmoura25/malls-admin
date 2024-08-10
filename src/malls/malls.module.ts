import { Module } from '@nestjs/common'
import { MallsResolver } from './graphql/resolvers/malls.resolver'
import { DatabaseModule } from '@/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [MallsResolver],
})
export class MallsModule {}
