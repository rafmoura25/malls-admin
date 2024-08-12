import { Test, TestingModule } from '@nestjs/testing'
import { MallsPrismaRepository } from '../repositories/malls-prisma.repository'
import { GetMallUsecase } from './get-mall.usecase'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { MallDataBuilder } from '../helpers/mall-data-builder'
import { NotFoundError } from '@/shared/errors/not-found-error'

describe('GetMallUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: MallsPrismaRepository
  let usecase: GetMallUsecase.Usecase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new MallsPrismaRepository(prisma as any)
    usecase = new GetMallUsecase.Usecase(repository)
  })

  beforeEach(async () => {
    await prisma.mall.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(() =>
      usecase.execute({ id: '796c5a25-1d3b-4228-9a75-06f416c6e218' }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  test('should be able to get mall by id', async () => {
    const data = MallDataBuilder({})
    const mall = await prisma.mall.create({ data })

    const result = await usecase.execute({ id: mall.id })
    expect(result).toStrictEqual(mall)
  })
})
