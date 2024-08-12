import { Test, TestingModule } from '@nestjs/testing'
import { MallsPrismaRepository } from '../repositories/malls-prisma.repository'
import { CreateMallUsecase } from './create-mall.usecase'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { MallDataBuilder } from '../helpers/mall-data-builder'
import { BadRequestError } from '@/shared/errors/bad-request-error'

describe('CreateMallUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: MallsPrismaRepository
  let usecase: CreateMallUsecase.Usecase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new MallsPrismaRepository(prisma as any)
    usecase = new CreateMallUsecase.Usecase(repository)
  })

  beforeEach(async () => {
    await prisma.mall.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should create a mall', async () => {
    const data = MallDataBuilder({})

    const mall = await usecase.execute(data)

    expect(mall.id).toBeDefined()
    expect(mall.createdAt).toBeInstanceOf(Date)
    expect(mall).toMatchObject(data)
  })

  test('should throws error when name not provided', async () => {
    const data = MallDataBuilder({})
    data.name = null
    await expect(() => usecase.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  test('should throws error when address not provided', async () => {
    const data = MallDataBuilder({})
    data.address = null
    await expect(() => usecase.execute(data)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
