import m from 'mithril'

import { dc } from '../utils/dynamic-classes'
import { config } from '../utils/config'
import { getShopListById, updateShopList } from '../utils/idb'

export const ItemNameReady = {
  view({ attrs: { item, listId, listState } }) {
    return m('div', [
      m(
        'div',
        {
          class: dc('flex justify-between pl-4', [
            item.checked,
            'line-through opacity-70',
          ]),
          onclick: async () => {
            if (listState !== config.listState.ready) return
            const list = await getShopListById(Number(listId))
            await updateShopList({
              ...list,
              items: list.items.map((i) =>
                i.name === item.name
                  ? {
                      ...i,
                      checked: !item.checked,
                    }
                  : i
              ),
            })
          },
        },
        [
          m(
            'div',
            {
              class: 'font-bold first-letter:uppercase',
            },
            item.name
          ),
          m('div', { class: 'font-normal flex gap-1' }, [
            m('span', { class: 'font-normal' }, item.quantity),
            m(
              'span',
              { class: 'font-normal' },
              ` ${item.unity}${item.quantity > 1 ? 's' : ''}`
            ),
          ]),
        ]
      ),
    ])
  },
}
