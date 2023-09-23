import m from 'mithril'

import {
  addItems,
  getItemByRealName,
  getShopListById,
  subscribe,
  updateShopList,
} from '../utils/idb'
import { config } from '../utils/config'

import { ItemName } from './item-name'
import { ItemNameReady } from './item-name-ready'

export const ItemsWithoutSection = {
  async search(listId) {
    const list = await getShopListById(Number(listId))
    const items = list.items.filter((item) => !item.section)
    const itemsWithSection = list.items.filter((item) => item.section)
    if (items.length === 0) return true

    const newItems = []
    for (const item of items) {
      const existItem = await getItemByRealName(item.realName)
      if (existItem) {
        newItems.push({
          ...item,
          section: existItem.section,
        })
      }
    }

    const itemsToSearch = items.filter(
      (item) => !newItems.find((it) => it.id === item.id)
    )
    if (itemsToSearch.length === 0) {
      await updateShopList(
        { ...list, items: [...itemsWithSection, ...newItems] },
        'update-api'
      )
      return true
    }

    try {
      const res = await m.request({
        method: 'POST',
        url: '/api/search',
        body: itemsToSearch.map((item) => item.name),
      })

      await addItems(res)

      const newItemsFromAPI = res.reduce((acc, item) => {
        const correctItem = acc.find((it) => it.name === item.realName)
        if (correctItem) return acc

        const findItem = itemsToSearch.find((it) => it.name === item.name)
        if (!findItem) return acc

        return [
          ...acc,
          {
            ...findItem,
            section: item.section,
          },
        ]
      }, [])

      await updateShopList(
        { ...list, items: [...itemsWithSection, ...newItemsFromAPI] },
        'update-api'
      )
    } catch (e) {
      console.error(e)
    } finally {
      return true
    }
  },

  oninit(vnode) {
    const id = vnode.attrs.id
    vnode.state.search(id, vnode)

    subscribe((payload) => {
      if (!payload) return false
      const { model, type, shopList } = payload
      if (model !== 'shopList' || type !== 'update' || !shopList) return false
      if (shopList?.id !== id) return false

      vnode.state.search(shopList.id, vnode)
      return true
    })
  },

  view(vnode) {
    const { list, listState } = vnode.attrs

    if (list.length === 0) return null

    const total = list.filter((item) => !item.section).length
    const checked = list.filter((item) => !item.section && item.checked).length

    return m('div', { class: 'flex flex-col gap-2' }, [
      m(
        'div',
        {
          class:
            'flex gap-1 justify-between item-center text-sl-accent-blue pl-1 pr-2',
        },
        `🧠 L'IA classe les articles (${checked}/${total})`
      ),
      list
        .filter((item) => !item.section)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) =>
          m(listState !== config.listState.draft ? ItemNameReady : ItemName, {
            key: item.name,
            item,
            listId: vnode.attrs.id,
            listState,
          })
        ),
    ])
  },
}
