const getUser = async (userId) => {
  const user = await main.user.findFirst()
  return user
}

const authService = {
  getUser,
}

export default authService
