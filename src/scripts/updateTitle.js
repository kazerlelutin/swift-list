import { parseRoute } from "../../libs/parseRoute"
import { router } from "../../libs/router"
import { updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

export async function updateTitle(form) {
  const { params } = parseRoute()

  const name = form.querySelector("[name='title']").value
  const list = await getShopListById(params.id)
  if (!list) return

  await updateShopList({
    ...list,
    name,
  })

  router()
}
