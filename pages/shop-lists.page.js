import m from 'mithril'

import { Layout } from '../components/layout'
import { ShopList } from '../components/shop-list'
import { AddListButton } from '../components/add-list.btn'

export const ShopListPage = {
  view() {
    return m(
      Layout,
      m(
        'div',
        {
          class: 'grid grid-rows-[1fr_auto] h-full gap-2 items-start',
        },
        [
          m(
            'div',
            { class: 'relative h-full ' },

            m(
              'div',
              {
                class:
                  'absolute top-0 right-0 left-0 bottom-0 overflow-y-auto inset-0 flex flex-col',
              },
              m(ShopList)
            )
          ),
          m('div', { class: 'flex justify-center' }, m(AddListButton)),
        ]
      )
    )
  },
}
