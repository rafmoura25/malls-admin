import { Query, Resolver } from '@nestjs/graphql'
import { Mall } from '../models/mall'
import { PrismaService } from '@/database/prisma/prisma.service'

@Resolver(() => Mall)
export class MallsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Mall])
  malls() {
    return this.prisma.mall.findMany()
  }
}
