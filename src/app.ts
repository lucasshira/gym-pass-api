import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// Registra as rotas da aplicacao
app.register(usersRoutes)
app.register(gymsRoutes)

// error handler global
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Adicionar ferramenta de observabilidade para monitorar erros em producao
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
