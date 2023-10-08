// Libs
import dotenv from 'dotenv'
import { db } from './db.js'

dotenv.config()

/**
 * @description Créer les tables de la base de données
 */
const createTable = async () => {
  const connection = await db()
  try {
    // Table des articles
    await connection.query(
      `
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        realName VARCHAR(255),
        section VARCHAR(255)
      );
    `,
      (err) => {
        if (err) throw err
        console.log('Table articles créée.')
      }
    )

    // Table des choix des utilisateurs
    await connection.query(
      `
      CREATE TABLE IF NOT EXISTS user_choices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        article_id INT,
        section VARCHAR(255),
        FOREIGN KEY (article_id) REFERENCES articles(id)
      );
    `,
      (err) => {
        if (err) throw err
        console.log('Table user_choices créée.')
      }
    )
  } catch (error) {
    console.error('Erreur lors de la création des tables:', error)
  } finally {
    connection.end() // Fermer la connexion
  }
}

// Appeler la fonction pour créer les tables
createTable()
