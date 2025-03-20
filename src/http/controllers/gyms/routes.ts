// arquivo de rotas da aplicacao de Gyms

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // todas as rotas aqui dentro vao chamar o middleware

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}

// controller faz as validacoes e toca no banco de dados com o repositorio
