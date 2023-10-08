import m from 'mithril'

import { Modal } from './modal'
import { QrCodeModal } from './qr-code-modal'

export const QrCode = {
  oninit(vnode) {
    vnode.state.open = false
  },
  view(vnode) {
    const { state, attrs } = vnode
    return m('div', '', [
      m(
        'button',
        {
          class: 'flex justify-center gap-2 uppercase font-bold',
          type: 'button',
          onclick: () => (state.open = true),
        },
        'Partager'
      ),
      state.open &&
        m(Modal, {
          open: state.open,
          onclose: () => (state.open = false),
          children: [
            m('canvas', { id: 'qr-code' }),
            m(QrCodeModal, { id: attrs.id }),
          ],
        }),
    ])
  },
}
