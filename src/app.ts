import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routesProducts from './routes/products.routes'

const server = express()

// Middlewares
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

// isAlive?
server.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' })
})

// Routes
server.use('/api', routesProducts)

export default server
