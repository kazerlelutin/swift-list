import m from 'mithril'

import { config } from '../utils/config'
import { getShopListById, openDatabase, subscribe } from '../utils/idb'

import { Items } from '../components/items'
import { Layout } from '../components/layout'
import { addItemForm } from '../components/add-item.form'
import { ListReadyFooter } from '../components/list-ready-footer'
import { ListFormNameForm } from '../components/list-name.form'
import { ItemsWithoutSection } from '../components/items-without-section'
import { ListArchivedFooter } from '../components/list-archived-footer'

export const ListPage = {
  async oninit(vnode) {
    await openDatabase()
    vnode.state.list = await getShopListById(Number(vnode.attrs.id))

    subscribe(async (payload) => {
      if (!payload) return false
      if (
        payload.model !== 'shopList' ||
        !payload.type.match(/update/) ||
        !payload?.shopList
      )
        return false
      if (payload?.shopList?.id !== vnode.state.list?.id) return false
      vnode.state.list = payload.shopList
      return true
    })
    m.redraw()
  },
  view(vnode) {
    if (!vnode.state.list)
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
          class: 'grid grid-rows-[auto_1fr_auto] h-full gap-2 max-w-md m-auto',
        },
        [
          m(
            'div',
            {
              class: 'px-10 flex items-center justify-center',
            },
            m(ListFormNameForm, {
              list: vnode.state.list,
              key: vnode.state.list.id,
            })
          ),
          m(
            'div',
            { class: 'relative h-full' },
            m(
              'div',
              {
                class:
                  'absolute top-0 right-0 left-0 bottom-0 overflow-y-auto inset-0 flex flex-col gap-2',
              },
              [
                m(Items, {
                  list: vnode.state.list.items.filter((item) => !!item.section),
                  id: vnode.state.list.id,
                  listState: vnode.state.list.state,
                }),
                m(ItemsWithoutSection, {
                  list: vnode.state.list.items.filter((item) => !item.section),
                  id: vnode.state.list.id,
                  listState: vnode.state.list.state,
                }),
              ]
            )
          ),
          vnode.state.list.state === config.listState.draft && m(addItemForm),
          vnode.state.list.state === config.listState.ready &&
            m(ListReadyFooter, { id: vnode.state.list.id }),
          vnode.state.list.state === config.listState.archived &&
            m(ListArchivedFooter, { id: vnode.state.list.id }),
        ]
      )
    )
  },
}
