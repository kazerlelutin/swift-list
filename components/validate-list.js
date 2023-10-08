import m from 'mithril'

import {
  getShopListById,
  openDatabase,
  subscribe,
  updateShopList,
} from '../utils/idb'
import { config } from '../utils/config'

import { Modal } from './modal'

export const ValidateList = {
  async oninit(vnode) {
    vnode.state.open = false

    await openDatabase()

    const id = Number(m.route.param('id'))
    vnode.state.list = await getShopListById(id)

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
    const { state } = vnode

    if (!state.list) return null

    return m(
      'button',
      {
        class:
          'bg-sl-accent-blue p-2 text-sl-secondary rounded-md disabled:opacity-50',
        type: 'button',
        disabled: !state.list?.items || state.list?.items.length < 1,
        onclick: () => (state.open = true),
      },
      [
        m('div', 'Valider la liste'),
        state.open &&
          m(Modal, {
            open: state.open,
            onclose: () => (state.open = false),
            action: async () => {
              await updateShopList({
                ...state.list,
                state: config.listState.ready,
              })
              state.open = false
            },
            children: m(
              'div',
              {
                class: 'font-bold uppercase text-sl-accent-blue',
              },
              `Valider la liste ?`
            ),
          }),
      ]
    )
  },
}
