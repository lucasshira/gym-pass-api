// arquivo de rotas da aplicacao de Users

import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export function usersRoutes(app: FastifyInstance) {
  // Login
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

// controller faz as validacoes e toca no banco de dados com o repositorio
