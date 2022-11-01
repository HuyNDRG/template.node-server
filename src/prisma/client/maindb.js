const log = ['error']
if (process.env.NODE_ENV === 'development') log.unshift('query')

const dbMainWrite = new PrismaClient({ datasources: { db: { url: process.env.PRISMA_DB_MAIN } }, log })
const dbMainRead = new PrismaClient({ datasources: { db: { url: process.env.PRISMA_DB_MAIN_READ } }, log })

const dbMain = { dbMainRead, dbMainWrite }

export default dbMain
