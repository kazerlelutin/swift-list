// Libs externes
import m from 'mithril'

// Components
import { Layout } from '../components/layout'
import { ShopListSection } from '../components/shop-list-section'

export const ListPage = {
  oninit(vnode) {
    console.log('vnode', vnode.attrs.id)
  },
  view() {
    return m(
      Layout,
      m(
        'div',
        {
          class: 'grid grid-rows-[1fr_auto] h-full gap-2',
        },
        [
          m(
            'div',
            { class: 'relative h-full ' },

            m(
              'div',
              {
                class:
                  'absolute top-0 right-0 left-0 bottom-0 overflow-y-auto inset-0 flex flex-col items-center',
              },
              m('div', 'le titre')
            )
          ),
          m('div', { class: 'flex justify-center' }, m('div', 'le form')),
        ]
      )
    )
  },
}