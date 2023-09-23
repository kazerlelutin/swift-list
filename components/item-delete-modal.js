import m from 'mithril'

import {
  getItemByRealName,
  getShopListById,
  updateItem,
  updateShopList,
} from '../utils/idb'

import { Modal } from './modal'

import { TrashIcon } from '../icons/trash.icon'

export const ItemDeleteModal = {
  oninit(vnode) {
    vnode.state.open = false
  },
  view(vnode) {
    const {
      attrs: { item, listId },
      state,
    } = vnode

    return m('div', [
      m(
        'div',
        {
          class: 'flex gap-2 items-center cursor-pointer',
          onclick: () => (state.open = true), // <-- Use state here
        },
        [
          m('div', { class: 'first-letter:uppercase' }, m(TrashIcon)),
          state.open &&
            m(Modal, {
              open: state.open,
              onclose: () => (state.open = false), // <-- Use state here
              action: async () => {
                const list = await getShopListById(Number(listId))

                await updateShopList(
                  {
                    ...list,
                    items: list.items.filter((it) => it.name !== item.name),
                  },
                  'update'
                )

                state.open = false // <-- Use state here
              },
              children: m(
                'div',
                {
                  class:
                    'flex flex-col justify-center gap-3 font-bold uppercase',
                },
                `Supprimer ${item.name}`
              ),
            }),
        ]
      ),
    ])
  },
}
