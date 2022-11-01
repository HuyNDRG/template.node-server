import mysql2 from 'mysql2/promise'
import { database } from '../config/config'

export const connection = mysql2.createConnection(database)

export const pool = mysql2.createPool(database)
