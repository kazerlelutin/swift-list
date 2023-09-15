import m from 'mithril'
import { config } from '../utils/config'
import { Hamburger } from '../icons/hamburger'

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Mes listes',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

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
  },

  onremove() {
    window.removeEventListener('resize', this.resize)
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
            this.isClose
              ? 'left-[-100%]'
              : 'left-0 shadow-[0_0px_30px_0px_rgba(0,0,0,0.5)]'
          } bg-sl-bg fixed top-0 bottom-0 z-40 border-r-4 border-sl-margin ${
            this.isMobile ? 'w-11/12' : 'w-1/4'
          } transition-all duration-500`,
        },
        m(
          'div',
          { class: 'flex flex-col gap-3 pt-14 px-4 text-2xl md:text-lg' },
          //TODO si includes path, ajouter class active
          links.map((link) => {
            return m(
              m.route.Link,
              {
                class: '',
                href: link.href,
                onclick: () => (this.isClose = true),
              },
              link.name
            )
          })
        )
      ),
    ])
  },
}
