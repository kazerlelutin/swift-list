// Libs
import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

/**
 *
 * @description Créer une connexion à la base de données.
 * @returns {Promise} Une promesse qui se résout avec la connexion à la base de données.
 */
export async function db() {
  console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  try {
    await connection.connect()
    return connection
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error, {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
  }
}
