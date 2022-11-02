import httpStatus from 'http-status'
import authService from '../services/auth.service'
import catchAsync from '../utils/catchAsync'

const login = catchAsync(async (req, res) => {
  const user = await authService.getUser()
  res.status(httpStatus.OK).send({ user })
})

const authController = { login }

export default authController
