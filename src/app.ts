import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

// Registra as rotas da aplicacao
app.register(appRoutes)

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
