import { sql } from '@vercel/postgres'

/**
 * Serverless function pour récupérer toutes les sections de la base de données.
 *
 * Cette fonction est déployée en tant que fonction serverless sur Vercel et est responsable de la récupération
 * de toutes les sections stockées dans la base de données PostgreSQL. Elle utilise le package @vercel/postgres
 * pour interagir avec la base de données.
 *
 * @async
 * @function
 * @param {object} _req - L'objet de requête HTTP. Bien que non utilisé dans cette fonction, il est inclus pour suivre le modèle standard de manipulation des requêtes Express.js.
 * @param {object} res - L'objet de réponse HTTP, utilisé pour envoyer la réponse au client.
 * @throws {Error} Lance une erreur si la requête SQL échoue pour une raison quelconque.
 * @return {Promise<object>} Une promesse qui résout avec un objet JSON contenant toutes les sections.
 */
export default async function section(_req, res) {
  try {
    const { rows } = await sql`SELECT * FROM section;`
    return res.status(200).json(rows)
  } catch (error) {
    console.error('Erreur lors de la récupération des sections :', error)
    return res.status(500).json({ message: 'Erreur interne du serveur', error })
  }
}
