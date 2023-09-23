// Libs externes
import m from 'mithril'

// Utils
import { isCurrentLink } from '../utils/is-current-link'

export const MenuLink = {
  view(vnode) {
    const { link } = vnode.attrs

    return m(
      m.route.Link,
      {
        class: `${
          isCurrentLink(link.href) ? 'text-sl-accent-blue' : ''
        } text-2xl md:text-lg`,
        href: link.href,
        onclick: vnode.attrs.onclick,
      },
      link.name
    )
  },
}
