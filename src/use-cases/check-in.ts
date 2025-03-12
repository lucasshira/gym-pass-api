// caso de uso (service) de checkin

import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    // metodo para fazer o processo de autenticacao
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
