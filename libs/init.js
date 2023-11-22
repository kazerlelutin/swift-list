import { attachLinkEventListeners } from "./attachLinkEventListeners"
import { router } from "./router"

/**
 * @description Initializes the router and sets up event listeners.
 */
export function init() {
  attachLinkEventListeners() // Attache les écouteurs d'événements aux liens.
  router() // Exécute le routeur une fois au chargement initial.
  window.addEventListener("popstate", router) // Gère les changements d'état du navigateur.
}
