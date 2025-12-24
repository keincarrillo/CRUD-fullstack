import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routesProducts from './routes/products.routes'
import routesAuthentication from './routes/authentication.routes'
import cookieParser from 'cookie-parser'

const server = express()

const allowedOrigins = ['http://localhost:5173']

// Middlewares
server.use(express.json())

server.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)

      if (allowedOrigins.includes(origin)) return cb(null, true)

      return cb(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

server.options('*', cors())
server.use(cookieParser())
server.use(morgan('dev'))

server.get('/', (req, res) => {
  res.sendStatus(200)
})

// Routes
server.use('/api/auth', routesAuthentication)
server.use('/api/products', routesProducts)

export default server
