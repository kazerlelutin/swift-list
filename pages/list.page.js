// Libs externes
import m from 'mithril'

// Components
import { Layout } from '../components/layout'
import { getShopListById, openDatabase } from '../utils/idb'
import { ListFormName } from '../components/list-name.form'

export const ListPage = {
  async oninit(vnode) {
    await openDatabase()
    this.list = await getShopListById(Number(vnode.attrs.id))
    m.redraw()
  },
  view() {
    if (!this.list)
      return m(
        'div',
        { class: 'flex items-center justify-center h-full' },
        'chargement...'
      )
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
              m(
                'div',
                { class: 'px-10 w-full flex items-center justify-center' },
                m(ListFormName, { list: this.list })
              )
            )
          ),
          m('div', { class: 'flex justify-center' }, m('div', 'le form')),
        ]
      )
    )
  },
}
