module.exports = {
  content: [
    './components/**/*.js',
    './icons/**/*.js',
    './pages/**/*.js',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        sl: {
          // Couleurs de base
          'primary-bg': '#FFF', // Fond très foncé
          primary: '#111',
          'primary-text': '#111', // Texte blanc

          // Couleurs d'accent
          'accent-blue': '#007BFF', // Bleu vif
          'accent-red': '#FF5733', // Rouge vif
          'accent-green': '#28A745', // Vert vif
          'accent-yellow': '#FFC107', // Jaune vif

          // Couleurs d'état
          'status-error': '#FF0000', // Rouge pour les erreurs
          'status-success': '#00FF00', // Vert pour le succès
          'status-info': '#17A2B8', // Bleu pour l'information
          'status-warning': '#FFC107', // Jaune pour les avertissements
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
