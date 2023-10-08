import m from 'mithril'

import { addShopList, getShopLists } from '../utils/idb'

import { PlusIcon } from '../icons/plus.icon'

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
    return m('div', [
      m(
        'button',
        {
          class: 'bg-sl-accent-green rounded-full p-2 fill-sl-primary-bg',
          onclick: this.createList,
        },
        m(PlusIcon)
      ),
    ])
  },
}
