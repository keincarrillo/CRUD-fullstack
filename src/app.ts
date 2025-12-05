import express from 'express'
import routesProducts from './routes/products.routes'

const server = express()

// Middlewares
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' })
})

// Routes
server.use('/api', routesProducts)

export default server
