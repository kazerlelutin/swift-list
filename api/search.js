import OpenAIApi from "openai"
import { supermarketSections } from "../data/sections.js"
import { mongoDb } from "../back/db.js"
import { Items } from "../back/models/items.model.mjs"

// Constantes -----------------------------------------------------------------
export const maxDuration = 120
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function search(req, res) {
  const itemsNames = req.body

  // On va toujours renvoyer un tableau, même si il est vide

  if (!itemsNames) return res.status(200).json([])
  await mongoDb()

  const existingItems = await Items.find({
    $or: [{ name: { $in: itemsNames } }, { realName: { $in: itemsNames } }],
  })

  // Si tout les articles sont connus, on renvoie la liste des articles
  if (existingItems.length === itemsNames.length) {
    return res.status(200).json(existingItems)
  }

  const itemsNamesToSearch = itemsNames.filter(
    (item) => !existingItems.find(({ name, realName }) => name === item || item === realName)
  )

  // Recherche des articles inconnus dans l'IA
  try {
    const sections = supermarketSections.map((section) => section.name).join("\n")

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          content: `Tu dois faire correspondre les noms des articles suivants:\n${itemsNamesToSearch.join(
            "\n"
          )}\navec les rayons suivants:\n${sections}.La réponse sera exclusivement dans le format CSV:\n
          nom du produit,rayon,nom du produit corrigé sans faute d'orthographe\n`,

          role: "user",
        },
      ],
      model: "gpt-3.5-turbo-1106",
      max_tokens: 1500,
      temperature: 0.4,
    })

    const lines = chatCompletion.choices[0].message.content.split("\n")
    const products = lines.map((line) => line.split(","))
    const items = products
      .filter((item) => item.length === 3)
      .reduce((acc, [name, section, realName]) => {
        const alreadyExist = acc.find((item) => item.name === name)
        if (!alreadyExist) acc.push({ name, section, realName })
        return acc
      }, [])
      .sort((a, b) => a.name.localeCompare(b.name))

    await Items.insertMany(items)
    return res.status(200).json(items)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ result: "erreur pour AI" })
  }
}
