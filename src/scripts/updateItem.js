import { parseRoute } from "../../libs/parseRoute"
import { router } from "../../libs/router"
import { updateShopList } from "../utils/idb"
import { getShopListById } from "./getShopList"

export async function updateItem(form) {
  const { params } = parseRoute()

  const name = form.querySelector("[name='name']").value
  const quantity = form.querySelector("[name='quantity']").value
  const unity = form.querySelector("[name='unity']").value
  const section = form.querySelector("[name='section']").value

  const list = await getShopListById(params.id)
  if (!list) return

  await updateShopList({
    ...list,
    items: list.items.map((item) => {
      if (item.name !== name) return item

      return {
        ...item,
        name,
        quantity,
        unity,
        section,
      }
    }),
  })

  router()
}
