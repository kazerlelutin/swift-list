import { parseRoute } from "../../libs/parseRoute"
import { template } from "../../libs/template"
import { createModal } from "../../libs/createModal"

import { STATES } from "../utils/constants"
import { createButton } from "../utils/createButton"
import { getShopListById } from "./getShopList"

/**
 * @description Créer les boutons d'actions pour une liste selon son state.
 * @returns {Promise<string>} - HTML string
 */
export async function createListAction() {
  const { params } = parseRoute()
  const { id } = params
  const errMessage = { name: "Liste introuvable", state: "introuvable" }

  if (!id) return errMessage

  const list = await await getShopListById(id)
  if (!list) return errMessage

  const { state } = list
  const classes = ["text-white", "py-1", "px-3", "rounded-md"]
  const el = document.createElement("div")

  if (state === STATES.ARCHIVED) {
    const copyButton = createButton("Copier la liste")
    copyButton.setAttribute("_", "on click app.helpers.copyList()")
    el.appendChild(copyButton)
  }

  if (state === STATES.DRAFT) {
    const buttonValidList = `<div class="${["bg-sl-valid", ...classes].join(" ")}" ${
      list.items.length === 0 ? "data-disabled title='Vous devez ajouter au moins un article'" : ""
    }>Valider la liste</div>`
    const buttonItem = `<div class="${["bg-sl-primary", ...classes].join(
      " "
    )}">Ajouter un article</div>`

    const modalContentItem = template("formModalContent")
    const modalContentValid = template("validListModalContent")
    const modalItem = createModal("formModal", modalContentItem, buttonItem)
    const modalValid = createModal("validModal", modalContentValid, buttonValidList)

    el.appendChild(modalValid)
    el.appendChild(modalItem)
  }

  return el.innerHTML
}
