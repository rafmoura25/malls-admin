import { Test, TestingModule } from '@nestjs/testing'
import { MallsPrismaRepository } from './malls-prisma.repository'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { MallDataBuilder } from '../helpers/mall-data-builder'

describe('MallsPrismaRepository Integration Tests', () => {
  let module: TestingModule
  let repository: MallsPrismaRepository
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new MallsPrismaRepository(prisma as any)
  })

  beforeEach(async () => {
    await prisma.mall.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(
      repository.findById('796c5a25-1d3b-4228-9a75-06f416c6e218'),
    ).rejects.toThrow(
      new NotFoundError(
        'Mall not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })

  test('should find an mall by id', async () => {
    const data = MallDataBuilder({})

    const mall = await prisma.mall.create({
      data,
    })

    const result = await repository.findById(mall.id)
    expect(result).toStrictEqual(mall)
  })

  test('should create a mall', async () => {
    const data = MallDataBuilder({})

    const mall = await repository.create(data)

    expect(mall).toMatchObject(data)
  })

  test('should throws an error when updating a mall not found', async () => {
    const data = MallDataBuilder({})
    const mall = {
      id: '796c5a25-1d3b-4228-9a75-06f416c6e218',
      ...data,
    }
    await expect(repository.update(mall)).rejects.toThrow(
      new NotFoundError(
        'Mall not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })

  test('should update a mall', async () => {
    const data = MallDataBuilder({})
    const mall = await prisma.mall.create({ data })

    const result = await repository.update({
      ...mall,
      name: 'new name',
    })

    expect(result.name).toBe('new name')
  })

  test('should throws an error when deleting a mall not found', async () => {
    await expect(
      repository.delete('796c5a25-1d3b-4228-9a75-06f416c6e218'),
    ).rejects.toThrow(
      new NotFoundError(
        'Mall not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })

  test('should delete a mall', async () => {
    const data = MallDataBuilder({})
    const mall = await prisma.mall.create({ data })

    const result = await repository.delete(mall.id)

    expect(result).toMatchObject(mall)
  })

  describe('search method', () => {
    test('should only apply pagination when the parameters are null', async () => {
      const createdAt = new Date()
      const data = []
      const arrange = Array(16).fill(MallDataBuilder({}))
      arrange.forEach((element, index) => {
        const timestamp = createdAt.getTime() + index
        data.push({
          ...element,
          name: `mall${index}`,
          createdAt: new Date(timestamp),
        })
      })

      await prisma.mall.createMany({ data })
      const result = await repository.search({})

      expect(result.total).toBe(16)
      expect(result.items.length).toBe(15)
      result.items.forEach(item => {
        expect(item.id).toBeDefined()
      })

      result.items.reverse().forEach((item, index) => {
        expect(`${item.name}${index + 1}`)
      })
    })

    test('should apply pagination and ordering', async () => {
      const createdAt = new Date()
      const data = []
      const arrange = 'badec'
      arrange.split('').forEach((element, index) => {
        const timestamp = createdAt.getTime() + index
        data.push({
          ...MallDataBuilder({ name: element }),
          createdAt: new Date(timestamp),
        })
      })

      await prisma.mall.createMany({ data })
      const result1 = await repository.search({
        page: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
      })

      expect(result1.items[0]).toMatchObject(data[1])
      expect(result1.items[1]).toMatchObject(data[0])

      const result2 = await repository.search({
        page: 2,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
      })

      expect(result2.items[0]).toMatchObject(data[4])
      expect(result2.items[1]).toMatchObject(data[2])
    })

    test('should apply pagination, filter and ordering', async () => {
      const createdAt = new Date()
      const data = []
      const arrange = ['test', 'a', 'TEST', 'b', 'Test']
      arrange.forEach((element, index) => {
        const timestamp = createdAt.getTime() + index
        data.push({
          ...MallDataBuilder({ name: element }),
          createdAt: new Date(timestamp),
        })
      })

      await prisma.mall.createMany({ data })
      const result1 = await repository.search({
        page: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'TEST',
      })

      expect(result1.items[0]).toMatchObject(data[0])
      expect(result1.items[1]).toMatchObject(data[4])

      const result2 = await repository.search({
        page: 2,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'TEST',
      })

      expect(result2.items[0]).toMatchObject(data[2])
      expect(result2.items.length).toBe(1)
    })
  })
})
