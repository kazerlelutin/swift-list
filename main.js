import { init } from "./libs/init"
import "./public/globals.css"

// Register service worker -----------------------------------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(
      (registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err)
      }
    )
  })
}

// Initialise l'application une fois que le DOM est complètement chargé.
document.addEventListener("DOMContentLoaded", init)
