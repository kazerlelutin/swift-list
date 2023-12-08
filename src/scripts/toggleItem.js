import { parseRoute } from "../../libs/parseRoute"
import { updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

/**
 *
 * @param {String} realName - real name of the item
 * @returns  Promise
 */
export async function toggleItem(realName) {
  const { params } = parseRoute()
  const { id } = params
  if (!id) return console.error("id is missing")
  const list = await getShopListById(id)

  return await updateShopList({
    ...list,
    items: list.items.map((item) => {
      if (item.realName === realName) return { ...item, checked: !item.checked }
      return item
    }),
  })
}
