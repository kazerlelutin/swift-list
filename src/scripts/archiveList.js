import { router } from "../../libs/router"
import { STATES } from "../utils/constants"
import { getShopListById, openDatabase, updateShopList } from "../utils/idb"

export async function archiveList(id) {
  console.log("archiveList", id)
  const listId = Number(id)
  await openDatabase()
  const list = await getShopListById(listId)
  if (!list) return
  list.state = STATES.ARCHIVED
  await updateShopList(list)
  router()
}
