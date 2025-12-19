import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379'

const client = createClient({ url: redisUrl })

client.on('error', error => {
  console.log(`Redis Client Err: ${error}`)
})

await client.connect()

export default client
