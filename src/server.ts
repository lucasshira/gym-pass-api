import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // facilita na hora de conectar aplicacoes frontend
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
