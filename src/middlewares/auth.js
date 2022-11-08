import httpStatus from 'http-status'
import ApiError from '../utils/ApiError'

const authMiddleware = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (req.url === '/auth/login') resolve()

    if (!!!req.cookies.emd_session) reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))

    resolve()
  })
    .then(() => next())
    .catch((err) => next(err))
}

export default authMiddleware
