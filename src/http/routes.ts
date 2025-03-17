// arquivo de rotas da aplicacao

import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export function appRoutes(app: FastifyInstance) {
  // Login
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

// controller faz as validacoes e toca no banco de dados com o repositorio
