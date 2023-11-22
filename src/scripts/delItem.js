import { parseRoute } from "../../libs/parseRoute"
import { router } from "../../libs/router"
import { updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

/**
 * @description - Delete item from list
 * @param {String} itemName
 * @returns {Promise<void>} - Promise
 */
export async function delItem(itemName) {
  const { params } = parseRoute()
  const list = await getShopListById(params?.id)
  if (!list) return

  updateShopList({
    ...list,
    items: list.items.filter((item) => item.name !== itemName),
  })

  router()
}
