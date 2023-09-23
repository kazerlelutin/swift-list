import m from 'mithril'

import { ListCard } from './list-card'

export const ShopListSection = {
  view({ attrs: { lists, name } }) {
    if (!lists.length) return null
    return m(
      'div',
      {
        class: 'flex flex-col gap-2',
      },
      [
        m(
          'div',
          {
            class: 'flex text-sl-accent-blue font-bold uppercase',
          },
          m('div', name)
        ),
        lists.map((list) =>
          m(
            'div',
            {
              key: list.id,
              class: 'flex flex-col gap-2',
            },
            m(ListCard, { list })
          )
        ),
      ]
    )
  },
}
