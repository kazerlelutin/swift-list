import { router } from "../../libs/router"
import { template } from "../../libs/template"
import { parseRoute } from "../../libs/parseRoute"

import { AI_SECTION_NAME, ITEM_STATE_TEMPLATE, STATES } from "../utils/constants"
import { getShopListById, addItems, updateShopList, openDatabase } from "../utils/idb"
import { createModal } from "../../libs/createModal"

/**
 *
 * @param {string} sectionName - section name
 * @param {Array[String]} lists - liste of items
 * @returns String - HTML string
 **/
export async function insertSection(sectionName, items) {
  const body = template("itemSection")
  const sectionEl = body.querySelector("section")
  const title = body.querySelector(`[data-type='title']`)
  const counterChecked = body.querySelector(`counter`)
  const counterTotal = body.querySelector(`[data-type='counter-total']`)
  const listEl = body.querySelector(`[data-type='list']`)
  const listState = document.body.querySelector(`[my-state]`)?.getAttribute("my-state")
  const itemsChecked = items.filter((item) => item.checked).length

  title.setAttribute("id", sectionName)
  sectionEl.setAttribute("finish", itemsChecked === items.length)

  title.innerText = sectionName

  counterChecked.innerText = itemsChecked

  if (sectionName === AI_SECTION_NAME) {
    const itemsNameWithoutSection = items.filter((item) => !item.section).map((item) => item.name)

    sectionEl.setAttribute("data-section", "ai")

    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsNameWithoutSection),
    })
      .then(async (res) => {
        const { params } = parseRoute()
        const id = Number(params.id)
        const items = await res.json()

        const list = await getShopListById(id)
        await openDatabase()
        await addItems(items)

        await updateShopList({
          ...list,
          items: list.items.map((item) => {
            const itemToUpdate = items.find(
              (itemFromAI) => itemFromAI.name === item.realName || itemFromAI.name === item.name
            )
            if (!itemToUpdate) return item

            return {
              ...item,
              name: itemToUpdate.name,
              section: itemToUpdate.section,
              realName: itemToUpdate.realName,
            }
          }),
        })
        router()
      })
      .catch((err) => console.error(err))

    //ICI on fait la requête à l'IA
  }

  if (items.length === 0 || (items.length === 1 && !items[0]?.name)) {
    counterTotal.innerText = 0
    return body.innerHTML
  } else {
    counterTotal.innerText = items.length
  }

  items.forEach((item) => {
    const el = template(ITEM_STATE_TEMPLATE[listState])
    const itemName = item.realName ? item.realName : item.name

    if (listState === STATES.DRAFT) {
      const name = el.querySelector("[data-type='item-name']")
      const quantity = el.querySelector("[data-type='item-quantity']")
      const delEl = el.querySelector("[data-type='trash']")

      // Modal delete item
      const delModalContent = template("delItemModalContent")

      delModalContent.querySelector("[data-type='list-name']").innerText = itemName
      delModalContent.querySelector("[data-type='confirm']")

      const modal = createModal(`${item.id}-del`, delModalContent, template("trashcan").innerHTML)

      delEl.appendChild(modal)

      // Modal edit item
      const editEl = el.querySelector("[data-type='edit']")
      const editModalContent = template("editModalContent")

      editModalContent.querySelector("form").setAttribute("data-name", item.name)
      editModalContent.querySelector(`[name='name']`).setAttribute("value", itemName)
      editModalContent.querySelector(`[name="quantity"]`).setAttribute("value", item.quantity)

      editModalContent
        .querySelector(`[name="unity"]`)
        .querySelector(`option[value="${item.unity}"]`)
        .setAttribute("selected", true)

      if (sectionName !== AI_SECTION_NAME) {
        editModalContent
          .querySelector(`[name="section"]`)
          .querySelector(`option[value="${item.section}"]`)
          .setAttribute("selected", true)
      }

      const modalEdit = createModal(`${item.id}-del`, editModalContent, template("pen").innerHTML)

      editEl.appendChild(modalEdit)

      name.innerText = itemName
      quantity.innerText = `${item.quantity} ${item.unity}${item.quantity > 1 ? "s" : ""}`
    } else {
      const input = el.querySelector("input[type='checkbox']")
      const label = el.querySelector("label")
      label.querySelector("[data-type='item-name']").innerText = itemName
      label.querySelector("[data-type='item-quantity']").innerText = `${item.quantity} ${
        item.unity
      }${item.quantity > 1 ? "s" : ""}`

      input.setAttribute("id", itemName)
      label.setAttribute("for", itemName)

      if (item.checked) {
        input.setAttribute("checked", true)
        label.classList.add("line-through")
      }
    }

    listEl.appendChild(el)
  })

  return body.innerHTML
}
