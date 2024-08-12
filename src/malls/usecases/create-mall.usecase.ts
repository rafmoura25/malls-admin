import { BadRequestError } from '@/shared/errors/bad-request-error'
import { MallsPrismaRepository } from '../repositories/malls-prisma.repository'
import { MallOutput } from '../dto/mall-output'

export namespace CreateMallUsecase {
  export type Input = {
    name: string
    address: string
    isActive: boolean
  }

  export type Output = MallOutput

  export class Usecase {
    constructor(private mallsRepository: MallsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const { address, name } = input
      if (!address || !name) {
        throw new BadRequestError('Input data not provided')
      }

      const malls = await this.mallsRepository.create(input)
      return malls
    }
  }
}
