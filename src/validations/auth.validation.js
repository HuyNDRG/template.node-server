import Joi from 'joi'

const login = {
  body: Joi.object().keys({
    // routerId: Joi.number().required(),
  }),
}

const authValidation = {
  login,
}

export default authValidation
