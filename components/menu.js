import m from 'mithril'
import { config } from '../utils/config'
import { Hamburger } from '../icons/hamburger'
import { MenuLink } from './menu-link'
import { routes } from '../main'

export const Menu = {
  oninit() {
    this.isMobile = window.innerWidth < config.mobileSize
    // On initialise la valeur de isClose à isMobile pour que le menu soit fermé par défaut sur mobile
    this.isClose = this.isMobile

    this.resize = () => {
      this.isMobile = window.innerWidth < config.mobileSize
      m.redraw() // Redessine la vue lorsque la taille de la fenêtre change
    }
    window.addEventListener('resize', this.resize)

    // Liez la méthode onLinkClick à l'objet du composant
    this.onLinkClick = this.onLinkClick.bind(this)
  },

  onremove() {
    window.removeEventListener('resize', this.resize)
  },
  onLinkClick() {
    // On ferme le menu lorsqu'on clique sur un lien, mais seulement sur mobile
    this.isClose = this.isMobile
  },

  view() {
    return m('div', [
      // Insérer directement le SVG et appliquer des styles
      m(
        'div',
        {
          class: 'fixed top-2 left-2 z-50 cursor-pointer',
          onclick: () => (this.isClose = !this.isClose),
        },
        m(Hamburger)
      ),
      m(
        'div',
        {
          class: `${
            this.isClose ? 'left-[-100%]' : 'left-0'
          } bg-sl-primary-bg fixed top-0 bottom-0 z-40 border-r-2 border-sl-primary transition-all duration-500`,
        },
        m(
          'div',
          {
            class:
              'flex flex-col gap-3 pt-14 pl-4 pr-12 text-2xl md:text-lg text-sl-primary-text',
          },
          routes
            .filter((link) => !!link.name)
            .map((link) => m(MenuLink, { link, onclick: this.onLinkClick }))
        )
      ),
    ])
  },
}
