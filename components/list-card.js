import m from 'mithril'

import { deleteShopList } from '../utils/idb'

import { Modal } from './modal'
import { TrashIcon } from '../icons/trash.icon'

export const ListCard = {
  oninit(vnode) {
    vnode.state.open = false
  },
  view(vnode) {
    const {
      attrs: { list },
    } = vnode
    return m('div', { key: list.id }, [
      vnode.state.open === 'delete' &&
        m(Modal, {
          open: vnode.state.open,
          onclose: () => (vnode.state.open = false), // <-- Use state here
          action: () => deleteShopList(list.id),
          children: m(
            'div',
            { class: 'flex flex-col justify-center items-center font-bold' },
            'Êtes-vous sûr de vouloir supprimer cette liste ?',
            m('p', { class: 'font-normal text-sl-accent-blue' }, list.name)
          ),
        }),
      m(
        'div',
        {
          class:
            'flex items-center justify-between gap-5 p-3 bg-sl-primary text-sl-primary-bg',
        },
        [
          m(
            m.route.Link,
            {
              href: '/list/' + list.id,

              class: '',
            },
            list.name
          ),
          m(
            'div',
            {
              onclick: () => (vnode.state.open = 'delete'),
            },
            m(TrashIcon)
          ),
        ]
      ),
    ])
  },
}
