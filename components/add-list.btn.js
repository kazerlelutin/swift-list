// Libs externes
import m from 'mithril'

// Icons
import { PlusIcon } from '../icons/plus.icon'

// Utils
import { addShopList, getShopLists } from '../utils/idb'

export const AddListButton = {
  async createList() {
    const list = await getShopLists()
    const newList = await addShopList({
      name: `Nouvelle liste (${list.length + 1})`,
      items: [],
      state: 'brouillon',
    })
    m.route.set('/list/' + newList)
  },
  view() {
    const className = 'bg-sl-accent-green rounded-full p-2 fill-sl-primary-bg'
    return m('div', [
      m(
        'button',
        {
          class: className,
          onclick: this.createList,
        },
        m(PlusIcon)
      ),
    ])
  },
}
