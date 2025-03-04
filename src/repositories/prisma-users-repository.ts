// Repositorio para manipulacao de usuarios no banco de dados

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new Error('User already exists.')
    }
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
