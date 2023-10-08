import m from 'mithril'

import { addShopList, getShopListById } from '../utils/idb'

import { Modal } from './modal'

export const ListArchivedFooter = {
  oninit(vnode) {
    vnode.state.open = false
  },
  view(vnode) {
    const { state, attrs } = vnode

    return m('div', { class: 'flex justify-center items-center gap-1' }, [
      m(
        'button',
        {
          class: 'bg-sl-accent-blue p-2 text-sl-secondary rounded-md',
          type: 'button',
          onclick: () => (state.open = true), // <-- Use state here
        },
        'Copier la liste'
      ),
      state.open &&
        m(Modal, {
          open: state.open,
          onclose: () => (state.open = false), // <-- Use state here
          action: async () => {
            const list = await getShopListById(attrs.id)

            const newList = await addShopList({
              items: list.items.map((item) => ({
                ...item,
                checked: false,
              })),
              name:
                list.name + ' (copie) ' + new Date().toLocaleString('fr-FR'),
              state: 'brouillon',
            })
            m.route.set('/list/' + newList)
            window.location.reload()
          },
          children: m(
            'div',
            {
              class: 'font-bold uppercase',
            },
            `Copier la liste ?`
          ),
        }),
    ])
  },
}
