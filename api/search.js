import OpenAIApi from 'openai'
//import OpenAIApi from 'openai/index.js'
import { db } from '../utils/db.js'
import { supermarketSections } from '../data/sections.js'

// Constantes -----------------------------------------------------------------
export const maxDuration = 120

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function search(req, res) {
  const articleNames = req.body

  const connection = await db(res)

  // Recherche des articles en base de données
  const existingArticles = await new Promise((resolve, reject) => {
    connection.query(
      'SELECT name, section, realName FROM articles WHERE name IN (?)',
      [articleNames],
      (searchErr, searchResults) => {
        if (searchErr) {
          console.error(searchErr)
          return res.status(400).json({ result })
        }
        resolve(searchResults)
      }
    )
  })

  // Recherche des articles inconnus en base de données
  const unknownArticles = articleNames.filter((art) => {
    return existingArticles.every(({ name }) => name !== art)
  })

  // Si tout les articles sont connus, on renvoie la liste des articles
  if (unknownArticles.length === 0)
    return res.status(200).json(existingArticles)

  // Recherche des articles inconnus dans l'IA
  try {
    const sections = supermarketSections
      .map((section) => section.name)
      .join('\n')

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          content: `Tu dois faire correspondre les noms de produits suivants:\n${unknownArticles.join(
            '\n'
          )}\navec les rayons suivants:\n${sections}.La réponse sera obligatoirement dans le format CSV:\n
          nom du produit,rayon,score de confiance entre 1 et 100,nom du produit corrigé sans faute d'orthographe\n`,

          role: 'user',
        },
      ],
      model: 'gpt-3.5-turbo-1106',
      max_tokens: 1500,
      temperature: 0.3,
    })

    console.log('OK GPT')
    const lines = chatCompletion.choices[0].message.content.split('\n')
    const products = lines.map((line) => line.split(','))

    const items = products
      .filter((item) => item.length === 4)
      .map((line) => [line[0], line[1], parseInt(line[2]), line[3]])
      .sort((a, b) => b[2] - a[2])
      .reduce((acc, [name, section, _score, correctedName]) => {
        const isExist = acc.find(([findName]) => name === findName)

        if (isExist) return acc
        acc.push([name, section, correctedName])
        return acc
      }, [])

    // On peut ajouter les nouveaux articles en base de données

    const filteredValues = items.map(() => `(?, ?,?)`).join(', ')
    const filteredPlaceholders = items.flat()

    const insertQuery = `INSERT IGNORE INTO articles (name, section, realName) VALUES ${filteredValues}`

    console.log('QUERY')
    await new Promise((resolve, reject) => {
      connection.query(insertQuery, filteredPlaceholders, (err, result) => {
        if (err) {
          console.error(err)
          return res.status(400).json({ result })
        }
        resolve(result)
      })
    })

    console.log('END QUERY')

    // Début des contrôles : on vérifie que la réponse est un tableau
    return res.status(200).json([
      ...existingArticles,
      ...items.map((item) => ({
        name: item[0],
        section: item[1],
        realName: item[2],
      })),
    ])
  } catch (error) {
    console.error(error)
    return res.status(400).json({ result: 'erreur pour AI' })
  }
}
