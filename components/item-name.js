import m from 'mithril'

import { ItemNameModal } from './item-name-modal'
import { ItemDeleteModal } from './item-delete-modal'

export const ItemName = {
  view({ attrs: { item, listId } }) {
    return m('div', [
      m('div', { class: 'flex justify-between pl-4' }, [
        m(ItemNameModal, { item, listId }),
        m(ItemDeleteModal, { item, listId }),
      ]),
    ])
  },
}
