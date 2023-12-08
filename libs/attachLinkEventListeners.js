import { router } from "./router"

/**
 * @description Attaches click event listeners to all anchor tags for routing.
 */
export function attachLinkEventListeners() {
  document.querySelectorAll("a").forEach((link) => {
    // uniquement les liens internes
    if (link.href.startsWith(window.location.origin)) {
      link.addEventListener("click", (e) =>
        router(e, link.href.replace(window.location.origin, ""))
      )
    }
  })
}
