import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import xss from 'xss-clean'
import config, { port } from './config/config.js'
import logger from './config/logger.js'
import auth from './middlewares/auth.js'
import { errorConverter, errorHandler } from './middlewares/error.js'
import routesV1 from './routes/v1/index.js'
import ApiError from './utils/ApiError.js'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())
app.use(compression())
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => res.send('Welcome to the server'))

app.use('/api/v1', auth, routesV1)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(errorConverter)

app.use(errorHandler)

export const startExpress = () => {
  return app.listen(port, () => logger.info(`Listening to port ${config.port}`))
}
