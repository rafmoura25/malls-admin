import { Test, TestingModule } from '@nestjs/testing'
import { MallsResolver } from './malls.resolver'

describe('MallsResolver', () => {
  let resolver: MallsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MallsResolver],
    }).compile()

    resolver = module.get<MallsResolver>(MallsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
