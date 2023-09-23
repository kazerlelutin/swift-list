import m from 'mithril'

import { dc } from '../utils/dynamic-classes'
import { config } from '../utils/config'

import { Menu } from './menu'

export const Layout = {
  oninit(vnode) {
    vnode.state.isMobile = window.innerWidth < config.mobileSize
    vnode.state.resize = () => {
      vnode.state.isMobile = window.innerWidth < config.mobileSize
      m.redraw() // Redessine la vue lorsque la taille de la fenêtre change
    }
    window.addEventListener('resize', vnode.state.resize)
  },

  onremove(vnode) {
    window.removeEventListener('resize', vnode.state.resize)
  },

  view(vnode) {
    return m(
      'div',
      {
        class: dc([
          vnode.state.isMobile,
          'w-screen h-screen flex flex-col justify-center items-center bg-sl-bg',
          'w-screen h-screen grid grid-cols-[auto_1fr] bg-sl-bg',
        ]),
      },
      [
        m(Menu),
        m(
          'div',
          { class: 'relative h-full w-full' },
          m(
            'div',
            {
              class: `absolute top-0 left-0 bottom-0 right-0 overflow-y-auto p-2`,
            },
            vnode.children
          )
        ),
      ]
    )
  },
}
