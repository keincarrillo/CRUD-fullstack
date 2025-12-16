import redis from 'redis'

const client = redis.createClient()

client.on('error', error => {
  console.log(`Redis Client Error: ${error}`)
})

await client.connect()

export default client
