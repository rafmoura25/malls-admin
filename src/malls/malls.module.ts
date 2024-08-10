import { Module } from '@nestjs/common'
import { MallsResolver } from './graphql/resolvers/malls.resolver'
import { DatabaseModule } from '@/database/database.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import { MallsPrismaRepository } from './repositories/malls-prisma.repository'

@Module({
  imports: [DatabaseModule],
  providers: [
    MallsResolver,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'MallsRepository',
      useFactory: (prisma: PrismaService) => {
        return new MallsPrismaRepository(prisma)
      },
      inject: ['PrismaService'],
    },
  ],
})
export class MallsModule {}
