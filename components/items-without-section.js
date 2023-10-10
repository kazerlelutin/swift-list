import m from 'mithril'

import {
  addItems,
  getItemByName,
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

    const existingItems = []
    for (const item of items) {
      const existItemByRealName = await getItemByRealName(item.realName)
      const existItemByName = await getItemByName(item.name)

      if (existItemByRealName) {
        existingItems.push({
          ...item,
          section:
            typeof existItemByRealName.section === 'string'
              ? existItemByRealName.section
              : existItemByRealName.section.name,
        })
      } else if (existItemByName) {
        existingItems.push({
          ...item,
          section:
            typeof existItemByName.section === 'string'
              ? existItemByName.section
              : existItemByName.section.name,
        })
      }
    }

    // Première passe: on ajoute les articles connus
    if (existingItems.length > 0) {
      await updateShopList(
        {
          ...list,
          items: list.items.map((item) => {
            const existingItem = existingItems.find(
              (it) => it.name === item.name
            )
            if (existingItem) {
              return {
                ...item,
                section: existingItem.section,
              }
            }
            return item
          }),
        },
        'update'
      )
    }

    // Si tous les articles sont connus, on arrête là
    if (existingItems.length === items.length) return true

    const newReqList = await getShopListById(Number(listId))

    const itToSearch = newReqList.items.filter((item) => !item.section)
    if (itToSearch.length === 0) return true
    try {
      const res = await m.request({
        method: 'POST',
        url: '/api/search',
        body: itToSearch.map((item) => item.name),
      })

      await addItems(res)

      const newItemsFromAPI = res.reduce((acc, item) => {
        const existingItem = acc.find((it) => it.name === item.name)
        if (existingItem) return acc
        acc.push(item)
        return acc
      }, [])

      await updateShopList(
        {
          ...list,
          items: list.items.map((item) => {
            const existingItem = newItemsFromAPI.find(
              (it) => it.name === item.name
            )
            if (existingItem) {
              return {
                ...item,
                realName: existingItem.realName,
                section: existingItem.section,
              }
            }
            return item
          }),
        },
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
    if (vnode.state.controller) vnode.state.controller.abort() // Annule la requête précédente
    vnode.state.controller = new AbortController() // Créez un nouveau contrôleur
    vnode.state.search(id, vnode)

    subscribe((payload) => {
      if (!payload) return false
      const { model, type, shopList } = payload
      if (model !== 'shopList' || type !== 'update' || !shopList) return false
      if (shopList?.id !== id) return false

      if (vnode.state.controller) vnode.state.controller.abort() // Annule la requête précédente
      vnode.state.controller = new AbortController() // Créez un nouveau contrôleur
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
