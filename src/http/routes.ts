// arquivo de rotas da aplicacao

import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}

// register eh meu controller de registro de usuario
// controller faz as validacoes e toca no banco de dados com o repositorio
