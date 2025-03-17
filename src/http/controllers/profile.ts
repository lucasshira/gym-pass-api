// rota que retorna os dados do usuario logado

import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify() // funcao para verificar se o token existe

  return reply.status(200).send
}
