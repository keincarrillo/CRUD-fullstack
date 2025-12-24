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
server.use(cookieParser())

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log('CORS blocked origin:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

server.use(morgan('dev'))

server.get('/', (req, res) => {
  res.sendStatus(200)
})

// Routes
server.use('/api/auth', routesAuthentication)
server.use('/api/products', routesProducts)

export default server
