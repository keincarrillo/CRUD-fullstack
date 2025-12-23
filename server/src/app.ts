import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routesProducts from './routes/products.routes'
import routesAuthentication from './routes/authentication.routes'
import cookieParser from 'cookie-parser'

const server = express()

// Middlewares
server.use(express.json())
server.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
server.use(cookieParser())
server.use(morgan('dev'))

// isAlive?
server.get('/', (req, res) => {
  res.sendStatus(200)
})

// Routes
server.use('/api/auth', routesAuthentication)
server.use('/api/products', routesProducts)

export default server
