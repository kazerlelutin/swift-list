import { parseRoute } from "../../libs/parseRoute"
import { router } from "../../libs/router"
import { STATES } from "../utils/constants"
import { updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

/**
 *
 * @description change list state to ready
 * @returns {Promise<void>} - reload page
 */
export async function validList() {
  const { params } = parseRoute()
  const { id } = params
  if (!id) return console.error("no id")
  const list = await getShopListById(id)
  list.state = STATES.READY
  await updateShopList(list)

  //reload page for change state
  router()
}
