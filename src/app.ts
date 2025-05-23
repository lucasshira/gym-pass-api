import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify()

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // access token valido por 10 minutos
  },
})

// Cookie
app.register(fastifyCookie)

// Registra as rotas da aplicacao
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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
