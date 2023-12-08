import { createModal } from "../../libs/createModal"
import { parseRoute } from "../../libs/parseRoute"
import { template } from "../../libs/template"
import { AI_SECTION_NAME, STATES } from "../utils/constants"
import { getShopListById } from "./getShopList"

/**
 * @description Loads the list with ID in URL from the database and injects them into the template.
 * @returns {Promise<string>} - HTML string
 */
export async function getList() {
  const { params } = parseRoute()
  const { id } = params
  const errMessage = { name: "Liste introuvable", state: "introuvable" }

  if (!id) return errMessage

  // récupération de liste depuis la base de données locale
  const list = await getShopListById(id)
  if (!list) return { name: errMessage }

  const { name, state } = list

  // === SPÉCIFIQUE À LA PAGE SELON SON STATE ===

  const stateEl = document.getElementById("state")
  if (stateEl) stateEl.innerText = state

  // ============================================

  const sections = list.items.reduce((acc, article) => {
    const { section } = article
    const nameStr = typeof section === "string" ? section : section?.name
    const sectionIndex = acc.findIndex((s) => {
      if (nameStr === "") return s.name === AI_SECTION_NAME
      return s.name === nameStr
    })

    if (sectionIndex === -1) {
      acc.push({
        name: nameStr || AI_SECTION_NAME,
        items: [article],
      })
    } else {
      acc[sectionIndex].items.push(article)
    }
    return acc
  }, [])

  if (sections)
    sections.sort((a, b) => {
      if (a.name === AI_SECTION_NAME) return 1
      if (b.name === AI_SECTION_NAME) return -1
      return a.name.localeCompare(b.name)
    })

  if (state === STATES.DRAFT && sections.length > 0) {
    const pen = template("pen")
    const penEl = document.createElement("span")
    const content = template("listTitleModalContent")
    content.querySelector('[name="title"]').setAttribute("value", name)

    pen.classList.add("opacity-50")
    penEl.appendChild(pen)
    const modal = createModal("title-modal", content, pen)

    //TODO mettre la transformation en input
    return { name: `${name}${modal.outerHTML}`, state, sections, id: Number(id) }
  }

  return { name, state, sections, id: Number(id) }
}
