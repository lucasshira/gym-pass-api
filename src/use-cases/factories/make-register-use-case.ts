import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new InMemoryUsersRepository() // TODO
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
