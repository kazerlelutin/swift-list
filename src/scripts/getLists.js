import { STATES } from "../utils/constants"
import { getShopLists, openDatabase } from "../utils/idb"

export async function getLists() {
  await openDatabase()
  const lists = await getShopLists()
  const sections = [STATES.READY, STATES.DRAFT, STATES.ARCHIVED]

  return sections.map((name) => ({
    name,
    lists: lists.filter((list) => list.state === name),
  }))
}
