import { parseRoute } from "../../libs/parseRoute"
import { router } from "../../libs/router"
import { getItemByName, updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

export async function addItem(quantity, unity, nameForm) {
  const { params } = parseRoute()
  const { id } = params
  const list = await getShopListById(id)
  if (!list) return console.log("Liste introuvable")
  const name = nameForm.trim().toLowerCase()

  const existItemInList = list.items.find((item) => item.name === name)

  if (existItemInList) {
    // Mis à jour de la quantité
    list.items = list.items.map((item) => {
      if (item.name === name) {
        item.quantity = Number(item.quantity)
        item.unity = unity
      }
      return item
    })
    await updateShopList({ ...list, items: [...list.items, item] })
  } else {
    // Ajout de l'item
    const item = {
      quantity: Number(quantity),
      unity,
      name,
      section: "",
      checked: false,
    }

    // Recherche de l'item dans la base de données
    const searchName = await getItemByName(name)

    // Si l'item est trouvé, on récupère la section et le vrai nom
    if (searchName) {
      item.realName = searchName.realName
      item.section = searchName.section
    }
    await updateShopList({ ...list, items: [...list.items, item] })
  }

  router()
}
