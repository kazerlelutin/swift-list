import m from 'mithril'

const isCurrent = (href) => {
  if (href === '/') {
    return window.location.hash === '' || window.location.hash === '#!/'
  }

  return window.location.hash.includes(href)
}

export const MenuLink = {
  view(vnode) {
    const { link } = vnode.attrs
    const isCurrentLink = isCurrent(link.href)

    return m(
      m.route.Link,
      {
        class: `${
          isCurrentLink ? 'text-sl-accent-blue' : ''
        } text-2xl md:text-lg`,
        href: link.href,
        onclick: vnode.attrs.onclick,
      },
      link.name
    )
  },
}
