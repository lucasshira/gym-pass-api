// arquivo de rotas da aplicacao de Check In

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // todas as rotas aqui dentro vao chamar o middleware

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}

// controller faz as validacoes e toca no banco de dados com o repositorio
