// Interface para Academias

import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
}
