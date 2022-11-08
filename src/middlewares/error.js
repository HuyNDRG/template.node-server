import httpStatus from 'http-status'
import config from '../config/config'
import logger from '../config/logger'
import ApiError from '../utils/ApiError'
const { INTERNAL_SERVER_ERROR } = httpStatus

export const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = INTERNAL_SERVER_ERROR
    message = httpStatus[INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    success: false,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}
