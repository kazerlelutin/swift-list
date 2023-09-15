// Libs
import dotenv from 'dotenv'
import { createClient } from '@vercel/postgres'
// Data à insérer
import { supermarketSections } from '../data/sections.js'

dotenv.config()

/**
 * Seed la base de données avec des sections et sous-sections prédéfinies.
 *
 * Le script utilise le package @vercel/postgres pour interagir avec une base de données PostgreSQL hébergée sur Vercel.
 * Il insère une série de sections et sous-sections dans la base de données, en évitant les doublons grâce à l'instruction SQL ON CONFLICT.
 *
 * @async
 * @function
 * @throws {Error} Lance une erreur si une étape du processus de seeding échoue.
 * @return {Promise<void>} Une promesse qui résout sans valeur une fois le seeding terminé avec succès.
 */
async function seedDatabase() {
  const client = createClient()

  try {
    await client.connect()

    // Insérer les sections
    const sectionValues = supermarketSections
      .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(', ')
    const sectionParams = supermarketSections.flatMap((section) => [
      section.name,
      section.icon,
    ])

    await client.query(`
      CREATE TABLE IF NOT EXISTS Section (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        icon VARCHAR(255),
        parentId INT REFERENCES Section(id)
      );`)

    await client.query(`
      CREATE TABLE IF NOT EXISTS Item (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        sectionId INT REFERENCES Section(id),
        correctedSectionId INT REFERENCES Section(id),
        correctionCount INT DEFAULT 0,
        correctionApproved BOOLEAN DEFAULT FALSE
      );
    `)

    await client.query(
      `INSERT INTO Section (name, icon) VALUES ${sectionValues} ON CONFLICT (name) DO NOTHING RETURNING id, name;`,
      sectionParams
    )

    // Récupérer les IDs des sections insérées

    const sectionIds = (
      await client.query('SELECT id, name FROM Section;')
    ).rows.reduce((acc, row) => {
      acc[row.name] = row.id
      return acc
    }, {})

    // Préparer les sous-sections pour l'insertion

    const subSectionData = []
    supermarketSections.forEach((section) => {
      const sectionId = sectionIds[section.name]
      section.subSections.forEach((subSectionName) => {
        subSectionData.push({ name: subSectionName, parentId: sectionId })
      })
    })

    // Insérer les sous-sections

    const subSectionValues = subSectionData
      .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(', ')
    const subSectionParams = subSectionData.flatMap((subSection) => [
      subSection.name,
      subSection.parentId,
    ])
    await client.query(
      `INSERT INTO Section (name, parentId) VALUES ${subSectionValues} ON CONFLICT (name) DO NOTHING;`,
      subSectionParams
    )

    console.log('🌱 Seed réussi')
  } catch (err) {
    console.error('Erreur lors du seed :', err)
  } finally {
    try {
      await client.end()
      console.log('Connexion à la base de données fermée')
    } catch (e) {
      console.error(
        'Erreur lors de la fermeture de la connexion à la base de données :',
        e
      )
    }
  }
}

seedDatabase().catch((err) => {
  console.error("Erreur lors de l'exécution du script de seed :", err)
})
