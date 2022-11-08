import { dbMainRead } from '../prisma/client/maindb.js'

const getUserForLogin = async (username) => {
  const user = await dbMainRead.user.findFirst({
    select: { user_id: true, password: true },
    where: { user_name: username },
  })
  return user
}

const getUserMe = async (userId) => {
  const me = await dbMainRead.user.findFirst({
    where: { user_id: userId },
    select: {
      user_id: true,
      user_name: true,
      full_name: true,
      office: { select: { office_id: true, name: true, list_role: true } },
    },
  })

  return me
}

const findUserRoleGroup = async (user_id, office_id) => {
  const roleGroup = await dbMainRead.role_group.findMany({
    select: { list_role: true, list_module: true },
    where: {
      office_id,
      list_user: { contains: `|${user_id}|` },
    },
  })

  return roleGroup
}

const authService = {
  getUserForLogin,
  getUserMe,
  findUserRoleGroup,
}

export default authService
