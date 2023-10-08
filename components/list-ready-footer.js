import m from 'mithril'

import { config } from '../utils/config'
import { getShopListById, updateShopList } from '../utils/idb'

import { Modal } from './modal'
import { QrCode } from './qr-code'

export const ListReadyFooter = {
  oninit(vnode) {
    vnode.state.open = false
  },
  view(vnode) {
    const { state, attrs } = vnode

    return m('div', { class: 'flex justify-between items-center gap-2' }, [
      m(QrCode, { id: attrs.id }),
      m(
        'div',
        { class: 'italic text-center text-sl-accent-blue' },
        'Vous pouvez rayer les articles'
      ),
      m(
        'button',
        {
          class:
            'flex justify-center gap-2 uppercase text-sl-accent-green font-bold',
          type: 'button',
          onclick: () => (state.open = true), // <-- Use state here
        },
        'Archiver'
      ),
      state.open &&
        m(Modal, {
          open: state.open,
          onclose: () => (state.open = false), // <-- Use state here
          action: async () => {
            const list = await getShopListById(attrs.id)
            await updateShopList({
              ...list,
              state: config.listState.archived,
            })
            state.open = false
          },
          children: m(
            'div',
            {
              class: 'font-bold uppercase',
            },
            `Archiver la liste ?`
          ),
        }),
    ])
  },
}
