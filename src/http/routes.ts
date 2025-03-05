// arquivo de rotas da aplicacao

import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}

// register eh meu controller de registro de usuario
// controller faz as validacoes e toca no banco de dados com o repositorio
