import { navigate } from "../../libs/navigate"
import { parseRoute } from "../../libs/parseRoute"
import { STATES } from "../utils/constants"
import { addShopList, getShopLists, openDatabase } from "../utils/idb"

/**
 * @description Copie une liste en récupérant son id dans l'url.
 * @returns {Promise<void>}
 */
export async function copyList() {
  const { params } = parseRoute()

  const { id } = params
  if (!id) return
  await openDatabase()
  const lists = await getShopLists()
  const listToCopy = lists.find((list) => list.id === Number(id))
  //TODO gérer l'erreur quand un composant sera créé pour ça.
  if (!listToCopy) return
  try {
    const copiedListId = await addShopList({
      name: `${listToCopy.name} ${new Date().toISOString()}`,
      state: STATES.DRAFT,
      items: listToCopy.items.map((item) => ({ ...item, checked: false })),
    })
    navigate(`/list/${copiedListId}`)
  } catch (err) {
    // si le nom n'est pas unique, on ajoute un timestamp
    console.error(err)
  }
}
