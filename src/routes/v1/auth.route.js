import { Router } from 'express'
import authController from '../../controllers/auth.controller.js'
import validate from '../../middlewares/validate.js'
import authValidation from '../../validations/auth.validation.js'

const authRoute = Router()

authRoute.route('/login').get(validate(authValidation.login), authController.login)

export default authRoute
