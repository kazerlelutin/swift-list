// Libs externes
import m from 'mithril'

// Components
import { ListCard } from './list-card'

export const ShopListSection = {
  view({ attrs: { lists, name } }) {
    if (!lists.length) return null
    return m(
      'div',
      {
        class: 'flex flex-col gap-1 items-center',
      },
      [
        m(
          'div',
          {
            class:
              'flex justify-center text-sl-accent-blue font-bold uppercase',
          },
          m('div', name)
        ),
        lists.map((list) =>
          m(
            'div',
            {
              key: list.id,
              class: 'flex flex-col gap-2 items-center',
            },
            m(ListCard, { list })
          )
        ),
      ]
    )
  },
}
