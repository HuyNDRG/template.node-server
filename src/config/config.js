import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV
const port = process.env.PORT || 3000
export const database = {
  prismaDbMain: process.env.PRISMA_DB_MAIN,
  prismaDbMainRead: process.env.PRISMA_DB_MAIN_READ,
  prismaDbSub: process.env.PRISMA_DB_SUB,
}

const config = { env, port, database }

export default config
