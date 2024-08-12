import { MallOutput } from '../dto/mall-output'
import { MallsPrismaRepository } from '../repositories/malls-prisma.repository'

export namespace GetMallUsecase {
  export type Input = {
    id: string
  }

  export type Output = MallOutput

  export class Usecase {
    constructor(private mallsRepository: MallsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id } = input
      const malls = await this.mallsRepository.findById(id)
      return malls
    }
  }
}
