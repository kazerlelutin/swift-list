import m from 'mithril'

import { config } from '../utils/config'
import { getShopLists, openDatabase, subscribe } from '../utils/idb'

import { ShopListSection } from './shop-list-section'

const sections = [
  {
    name: 'A faire',
    state: config.listState.ready,
  },
  {
    name: 'Brouillons',
    state: config.listState.draft,
  },
  {
    name: 'Archivées',
    state: config.listState.archived,
  },
]

export const ShopList = {
  lists: [],
  async oninit() {
    await openDatabase()
    this.lists = await getShopLists()

    subscribe(async (payload) => {
      if (!payload) return false
      if (payload.model === 'shopList' && payload.type === 'delete') {
        this.lists = await getShopLists()
        m.redraw()
      }
    })
    m.redraw()
  },

  view() {
    const className = 'flex flex-col gap-2 items-center'
    return m(
      'div',
      {
        class: className,
      },
      sections.map((section) =>
        m(ShopListSection, {
          key: section.state,
          lists: this.lists.filter((list) => list.state === section.state),
          name: section.name,
        })
      )
    )
  },
}
