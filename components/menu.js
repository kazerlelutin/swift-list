import m from 'mithril'

import { dc } from '../utils/dynamic-classes'
import { config } from '../utils/config'
import { routes } from '../main'

import { MenuLink } from './menu-link'
import { HamburgerIcon } from '../icons/hamburger.icon'

export const Menu = {
  oninit(vnode) {
    vnode.state.isMobile = window.innerWidth < config.mobileSize
    // On initialise la valeur de isClose à isMobile pour que le menu soit fermé par défaut sur mobile
    vnode.state.isClose = vnode.state.isMobile

    vnode.state.resize = () => {
      vnode.state.isMobile = window.innerWidth < config.mobileSize
      m.redraw() // Redessine la vue lorsque la taille de la fenêtre change
    }
    window.addEventListener('resize', vnode.state.resize)

    // Liez la méthode onLinkClick à l'objet du composant
    vnode.state.onLinkClick = vnode.state.onLinkClick.bind(vnode.state)
  },

  onremove(vnode) {
    window.removeEventListener('resize', vnode.state.resize)
  },
  onLinkClick(vnode) {
    // On ferme le menu lorsqu'on clique sur un lien, mais seulement sur mobile
    vnode.state.isClose = vnode.state.isMobile
  },

  view(vnode) {
    return m('div', [
      // Insérer directement le SVG et appliquer des styles
      vnode.state.isMobile &&
        m(
          'div',
          {
            class: 'fixed top-2 left-2 z-50 cursor-pointer',
            onclick: () => (vnode.state.isClose = !vnode.state.isClose),
          },
          m(HamburgerIcon)
        ),
      m(
        'div',
        {
          class: dc(
            [vnode.state.isClose, 'left-[-100%]', 'left-0'],
            [vnode.state.isMobile, 'fixed top-0 bottom-0 z-40', 'h-full'],
            'bg-sl-primary-bg',
            'border-r-2  border-sl-primary',
            'transition-all duration-500'
          ),
        },
        m(
          'div',
          {
            class: dc(
              'flex flex-col gap-3',
              'pl-4 pr-12',
              'text-2xl md:text-lg text-sl-primary-text',
              [vnode.state.isMobile, 'pt-4', 'pt-2']
            ),
          },
          m('img', {
            src: '/logo.svg',
            alt: 'logo',
            class: 'w-12 m-auto h-auto',
            title: 'Swift List',
            width: '48',
            height: '48',
          }),
          routes
            .filter((link) => !!link.name)
            .map((link) =>
              m(MenuLink, {
                key: link.name,
                link,
                onclick: vnode.state.onLinkClick,
              })
            ),
          m(
            'a',
            {
              class: 'flex flex-col gap-3 font-bold mt-4',
              href: 'https://ko-fi.com/kazerlelutin',
              target: '_blank',
            },
            'Me Soutenir'
          )
        )
      ),
    ])
  },
}
