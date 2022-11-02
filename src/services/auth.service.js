import { dbMainRead } from '../prisma/client/maindb.js'

const getUser = async (userId) => {
  const user = await dbMainRead.user.findFirst({ where: { user_id: userId } })
  return user
}

const authService = {
  getUser,
}

export default authService
