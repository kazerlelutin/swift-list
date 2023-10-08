import m from 'mithril'
import Qr from 'qrcode'

import { getShopListById } from '../utils/idb'
import { convertTxtToBase64 } from '../utils/convert-to-base64'

import { Modal } from './modal'

export const QrCodeModal = {
  async oninit() {
    const canvas = document.getElementById('qr-code')
    if (!canvas) return (state.open = false)
    const list = await getShopListById(attrs.id)

    const str = list.items
      .map((item) => {
        return [item.realName, item.quantity, item.unity.substr(0, 2)]?.join(
          ','
        )
      })
      .join('|')

    const base = convertTxtToBase64(str)
    const url = `${window.location.origin}/#!/import/${base}`

    Qr.toCanvas(canvas, url, (error) => {
      if (error) console.error(error)
    })
  },
  view(vnode) {
    const { state } = vnode
    return m('div', '', [
      m(
        'button',
        {
          class: 'flex justify-center gap-2 uppercase font-bold',
          type: 'button',
          onclick: async () => {},
        },
        'Partager'
      ),
      state.open &&
        m(Modal, {
          open: state.open,
          onclose: () => (state.open = false), // <-- Use state here
          children: m('canvas', { id: 'qr-code' }),
        }),
    ])
  },
}
