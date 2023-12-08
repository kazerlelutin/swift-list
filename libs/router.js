import { loadHyperscript } from "./loadHyperscript"
import { attachLinkEventListeners } from "./attachLinkEventListeners"
import { parseRoute } from "./parseRoute"

//TODO trouver un moyen de le rendre paramétrable
import { ROUTE_PREFIX } from "../src/utils/constants"
import pages from "../src/pages"

/**
 * @description Handles routing logic.
 * @param {Event} e - The event object.
 */
export function router(e, href) {
  if (e) e.preventDefault() // Empêche le comportement par défaut du lien.

  // _hyperscript dois être disponible avant l'exécution des templates.
  loadHyperscript(() => {
    const { template, route } = parseRoute(href)
    const page = pages[template]
    const app = document.querySelector("#app")
    const pageObj = page()

    if (!pageObj) return (app.innerHTML = "404")

    const { content, helpers } = pageObj

    // Ajoute les fonctions d'assistance à l'objet _hyperscript.
    app.helpers = helpers
    app.innerHTML = content

    const origin = window.location.origin

    window.history.replaceState(
      null,
      null,
      `${origin.endsWith("/") ? origin : origin + "/"}${ROUTE_PREFIX}${route}`
    )
    attachLinkEventListeners() // Ré-attache les écouteurs aux nouveaux liens après le changement de contenu.
  })
}
