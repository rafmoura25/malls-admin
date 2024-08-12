import { Module } from '@nestjs/common'
import { MallsResolver } from './graphql/resolvers/malls.resolver'
import { DatabaseModule } from '@/database/database.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import { MallsPrismaRepository } from './repositories/malls-prisma.repository'
import { ListMallUsecase } from './usecases/list-mall.usecase'
import { GetMallUsecase } from './usecases/get-mall.usecase'
import { CreateMallUsecase } from './usecases/create-mall.usecase'

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
    {
      provide: ListMallUsecase.Usecase,
      useFactory: (mallsRepository: MallsPrismaRepository) => {
        return new ListMallUsecase.Usecase(mallsRepository)
      },
      inject: ['MallsRepository'],
    },
    {
      provide: GetMallUsecase.Usecase,
      useFactory: (mallsRepository: MallsPrismaRepository) => {
        return new GetMallUsecase.Usecase(mallsRepository)
      },
      inject: ['MallsRepository'],
    },
    {
      provide: CreateMallUsecase.Usecase,
      useFactory: (mallsRepository: MallsPrismaRepository) => {
        return new CreateMallUsecase.Usecase(mallsRepository)
      },
      inject: ['MallsRepository'],
    },
  ],
})
export class MallsModule {}
