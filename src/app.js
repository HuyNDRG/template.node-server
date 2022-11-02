import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import xss from 'xss-clean'
import config from './config/config'
import logger from './config/logger'
import _morgan from './config/morgan'
import authMiddleware from './middlewares/auth'
import { errorConverter, errorHandler } from './middlewares/error'
import routerV1 from './routes/v1'
import ApiError from './utils/ApiError'

const app = express()

if (config.env !== 'test') {
  app.use(_morgan.successHanlder)
  app.use(_morgan.errorHandler)
}

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())
app.use(compression())
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => res.send('Welcome to the server'))

app.use('/api/v1', authMiddleware, routerV1)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(errorConverter)

app.use(errorHandler)

export const startExpress = () => {
  return app.listen(config.port, () => logger.info(`Listening to port ${config.port}`))
}
