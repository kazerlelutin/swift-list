import m from 'mithril'
import Qr from 'qrcode'

import { getShopListById } from '../utils/idb'
import { convertTxtToBase64 } from '../utils/convert-to-base64'

export const QrCodeModal = {
  async oncreate(vnode) {
    const list = await getShopListById(vnode.attrs.id)

    const str = list.items
      .map((item) => {
        return [item.realName, item.quantity, item.unity.substr(0, 2)]?.join(
          ','
        )
      })
      .join('|')

    const base = convertTxtToBase64(str)
    const url = `${window.location.origin}/#!/import/${base}`

    const canvas = document.getElementById('qr-code')

    if (!canvas) return

    Qr.toCanvas(canvas, url, (error) => {
      if (error) console.error(error)
    })
  },
  view() {
    return m('span')
  },
}
