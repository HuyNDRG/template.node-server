import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV
const port = process.env.PORT || 8008
export const database = {
  prismaDbMain: process.env.PRISMA_DB_MAIN,
  prismaDbMainRead: process.env.PRISMA_DB_MAIN_READ,
  prismaDbSub: process.env.PRISMA_DB_SUB,
}

let whitelist = []
if (env === 'development') {
  whitelist.push('http://localhost:3000')
}

const config = { env, port, database, whitelist }

export default config
