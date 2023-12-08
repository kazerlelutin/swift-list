import { createLink } from "../utils/createLink"
import { template } from "../../libs/template"
import { createModal } from "../../libs/createModal"
import { STATES } from "../utils/constants"

/**
 *
 * @param {String} sectionName - Nom de la section
 * @param { Array[{name: String, id: number}] } lists  - liste of items
 * @returns String - HTML string
 */
export function insertLists(sectionName, lists) {
  const content = document.createElement("div")
  const sectionLists = lists.filter((list) => list.state === sectionName)
  const bodyContent = template("sectionList")

  bodyContent.querySelector("h2").innerText = sectionName
  bodyContent.setAttribute("key", sectionName)
  // Utilisation des attributs de données pour identifier le type de contenu, sans utiliser de classe ou d'ID.
  const listEl = bodyContent.querySelector(`[data-type='list']`)

  sectionLists.forEach((list) => {
    const el = template("listLine")
    el.id = `list-${list.id}`
    const elForLink = el.querySelector("[data-type='link']")
    const elForTrash = el.querySelector("[data-type='trash']")

    // --- link ---
    const link = createLink(`/list/${list.id}`, list.name)
    elForLink.innerHTML = link.outerHTML

    // --- trash ---
    const modalContent = template("delListModalContent")
    const modalButton = modalContent.querySelector("[data-type='confirm']")
    const listName = modalContent.querySelector("[data-type='list-name']")
    const modal = createModal(`${list.id}-del`, modalContent, template("trashcan").innerHTML)
    modalButton.setAttribute("data-id", list.id)
    listName.innerText = list.name
    elForTrash.innerHTML = modal.outerHTML
    listEl.appendChild(el)

    // --- archive ---

    if (sectionName === STATES.READY) {
      const elForArchive = el.querySelector("[data-type='archive']")
      const modalArchivedContent = template("archiveListModalContent")
      const modalArchivedButton = modalArchivedContent.querySelector("[data-type='confirm']")
      const modal = createModal(
        `${list.id}-archived`,
        modalArchivedContent,
        template("archive").innerHTML
      )
      modalArchivedButton.setAttribute("data-id", list.id)
      elForArchive.classList.add("pl-3", "fill-sl-valid")
      elForArchive.innerHTML = modal.outerHTML
    }
  })

  if (sectionLists.length === 0) {
    listEl.appendChild(template("noList"))
  }
  // ajout du contenu au contenu temporaire
  bodyContent.appendChild(listEl)
  content.appendChild(bodyContent)
  return content.innerHTML
}
