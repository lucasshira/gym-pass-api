import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

// Registra as rotas da aplicacao
app.register(appRoutes)
