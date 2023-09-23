// Libs externes
import m from 'mithril'

// DB
import { getShopLists, openDatabase } from '../utils/idb'

// Components
import { ShopListSection } from './shop-list-section'
import { config } from '../utils/config'

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
