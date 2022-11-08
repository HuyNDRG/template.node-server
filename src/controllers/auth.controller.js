import MD5 from 'md5'
import authService from '../services/auth.service'
import apiResp, { RespData } from '../utils/apiResp'
import { decodeBase64, encodeBase64 } from '../utils/base64'
import catchAsync from '../utils/catchAsync'

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body
  const user = await authService.getUserForLogin(username)

  let respData = new RespData()

  if (!user) {
    respData.errors = { fieldErrors: [{ key: 'username', message: 'User does not exists' }] }
    return apiResp(res, respData)
  }
  if (MD5(password) !== user.password) {
    respData.errors = { fieldErrors: [{ key: 'password', message: 'Password incorrect' }] }
    return apiResp(res, respData)
  }

  respData.success = true
  respData.data = { userId: user.user_id }
  res.cookie('emd_session', encodeBase64(user.user_id.toString()), {
    httpOnly: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  return apiResp(res, respData)
})

const me = catchAsync(async (req, res, next) => {
  const userId = parseInt(decodeBase64(req.cookies.emd_session))

  const me = await authService.getUserMe(userId)

  let respData = new RespData()

  if (!me) {
    return apiResp(res, respData)
  }

  const roleGroups = await authService.findUserRoleGroup(me.user_id, me.office.office_id)

  const officeRole = me.office.list_role?.split('|') || []
  let finalRole = []
  let finalModule = []

  if (roleGroups.length > 0) {
    roleGroups.forEach((roleGroup) => {
      const roles = roleGroup.list_role.split('|')
      const modules = roleGroup.list_module.split('|')

      roles.forEach((role) => {
        if (!!role && officeRole.includes(role) && !finalRole.includes(parseInt(role))) finalRole.push(parseInt(role))
      })

      modules.forEach((module) => {
        if (!!module && !finalModule.includes(parseInt(module))) finalModule.push(parseInt(module))
      })
    })
  }

  let data = {
    user: {
      username: me.user_name,
      fullName: me.full_name,
      roles: finalRole,
      modules: finalModule,
    },
    office: { id: me.office.office_id, name: me.office.name },
  }

  respData.success = true
  respData.data = data

  return apiResp(res, respData)
})

const authController = { login, me }

export default authController
