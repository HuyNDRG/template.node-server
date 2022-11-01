import httpStatus from 'http-status'
import authService from '../services/auth.service.js'
import catchAsync from '../utils/catchAsync.js'

const login = catchAsync(async (req, res) => {
  const user = authService.getUser()
  res.status(httpStatus.OK).send({ user })
})

const authController = { login }

export default authController
