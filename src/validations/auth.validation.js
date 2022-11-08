import Joi from 'joi'

const login = {
  body: Joi.object().keys({
    // routerId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

const authValidation = {
  login,
}

export default authValidation
