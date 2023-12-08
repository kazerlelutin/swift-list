import { navigate } from "../../libs/navigate"
import { addShopList, openDatabase } from "../utils/idb"

export async function createList() {
  await openDatabase()
  const id = await addShopList({
    name: `Nouvelle liste ${new Date().toLocaleString()}`,
    items: [],
    date: new Date().toISOString(),
    state: "brouillon",
  })

  navigate(`/list/${id}`)
}
