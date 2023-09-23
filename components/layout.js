// Libs externes
import m from 'mithril'

// Utils
import { config } from '../utils/config'

// Components
import { Menu } from './menu'

export const Layout = {
  oninit() {
    this.isMobile = window.innerWidth < config.mobileSize
    this.resize = () => {
      this.isMobile = window.innerWidth < config.mobileSize
      m.redraw() // Redessine la vue lorsque la taille de la fenêtre change
    }
    window.addEventListener('resize', this.resize)
  },

  onremove() {
    window.removeEventListener('resize', this.resize)
  },

  view(vnode) {
    const className = vnode.isMobile
      ? 'w-screen h-screen flex flex-col justify-center items-center bg-sl-bg'
      : 'w-screen h-screen grid grid-cols-[auto_1fr] bg-sl-bg'

    return m('div', { class: className }, [
      m(Menu),
      m(
        'div',
        { class: 'relative h-full' },
        m(
          'div',
          {
            class: `absolute top-0 left-0 bottom-0 right-0 overflow-y-auto ${
              this.isMobile ? 'pt-12 px-3 pb-3' : 'p-2'
            }`,
          },
          vnode.children
        )
      ),
    ])
  },
}
