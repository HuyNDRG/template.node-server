import pkg from 'http-status'
const { UNAUTHORIZED, FORBIDDEN } = pkg
import ApiError from '../utils/ApiError.js'

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(UNAUTHORIZED, 'Please authenticate'))
  }
  req.user = user

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role)
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight))
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(FORBIDDEN, 'Forbidden'))
    }
  }

  resolve()
}

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    // xác thực token ở đây
    resolve()
  })
    .then(() => next())
    .catch((err) => next(err))
}

export default auth
