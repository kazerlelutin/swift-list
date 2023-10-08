import m from 'mithril'
import Qr from 'qrcode'

import { getShopListById } from '../utils/idb'
import { convertTxtToBase64 } from '../utils/convert-to-base64'

import { Modal } from './modal'

async function generateQrCode(vnode) {
  const list = await getShopListById(vnode.attrs.id)

  const str = list.items
    .map((item) => {
      return [item.realName, item.quantity, item.unity.substr(0, 2)]?.join(',')
    })
    .join('|')

  const base = convertTxtToBase64(str)
  const url = `${window.location.origin}/#!/import/${base}`

  const canvas = document.getElementById('qr-code')

  if (!canvas) return

  Qr.toCanvas(canvas, url, (error) => {
    if (error) console.error(error)
  })
}

export const QrCode = {
  oninit(vnode) {
    vnode.state.open = false
  },
  oncreate(vnode) {
    if (vnode.state.open) {
      generateQrCode(vnode)
    }
  },
  view(vnode) {
    const { state, attrs } = vnode
    return m('div', '', [
      m(
        'button',
        {
          class: 'flex justify-center gap-2 uppercase font-bold',
          type: 'button',
          onclick: async () => {
            state.open = true
            const list = await getShopListById(attrs.id)

            const str = list.items
              .map((item) => {
                return [
                  item.realName,
                  item.quantity,
                  item.unity.substr(0, 2),
                ]?.join(',')
              })
              .join('|')

            const base = convertTxtToBase64(str)
            const url = `${window.location.origin}/#!/import/${base}`

            const canvas = document.getElementById('qr-code')

            if (!canvas) return (state.open = false)

            Qr.toCanvas(canvas, url, (error) => {
              if (error) console.error(error)
            })
          },
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
