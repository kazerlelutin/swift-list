import m from 'mithril'
import { config } from '../utils/config'
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
      : 'w-screen h-screen flex flex-col justify-center items-center bg-sl-bg'

    return m('div', { class: className }, [
      m(Menu),
      m('div', `Mobile: ${this.isMobile}`),
      vnode.children,
    ])
  },
}
