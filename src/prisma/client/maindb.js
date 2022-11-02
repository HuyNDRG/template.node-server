import config from '../../config/config'
import { PrismaClient } from '../generated/maindb'

const log = ['error']
if (process.env.NODE_ENV === 'development') log.unshift('query')

const dbMainWrite = new PrismaClient({ datasources: { db: { url: config.database.prismaDbMain } }, log })
const dbMainRead = new PrismaClient({ datasources: { db: { url: config.database.prismaDbMainRead } }, log })

export { dbMainRead, dbMainWrite }
