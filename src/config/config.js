import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pathEnv = path.join(__dirname, '../../.env')

dotenv.config({ path: pathEnv })

export const env = process.env.NODE_ENV
export const port = process.env.PORT || 3000
export const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
}

const config = { env, port, database }

export default config
