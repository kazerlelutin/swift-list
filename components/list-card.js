// Libs externes
import m from 'mithril'

export const ListCard = {
  view({ attrs: { list } }) {
    const className = 'p-3 bg-sl-primary  text-sl-primary-bg'
    return m(m.route.Link, { href: '/list/' + list.id, key: list.id }, [
      m('div', { class: className }, list.name),
    ])
  },
}
