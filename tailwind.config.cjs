/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        sl: {
          // Couleurs de base
          bg: "#F2F2F2",
          primary: "#5855e3",
          secondary: "#4997E3",
          tertiary: "#c5c3f7",
          text: "#000",
          accent: "#8C4B45",
          valid: "#4CAF50",
          brain: "#d433a9",
          // Couleurs d'état
          "status-error": "#ad2626", // Rouge pour les erreurs
          "status-success": "#00FF00", // Vert pour le succès
          "status-info": "#17A2B8", // Bleu pour l'information
          "status-warning": "#FFC107", // Jaune pour les avertissements
        },
      },
    },
  },
  plugins: [],
}
