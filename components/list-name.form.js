import m from 'mithril'

import { updateShopList } from '../utils/idb'

export const ListFormNameForm = {
  oninit(vnode) {
    vnode.state.name = vnode.attrs.list.name
    vnode.state.list = vnode.attrs.list
  },
  handleInput(e, vnode) {
    vnode.state.name = e.target.value
    updateShopList({ ...vnode.state.list, name: e.target.value })
  },
  view(vnode) {
    return m('div', [
      m('label', { for: 'add-item-input' }),
      m('input', {
        type: 'text',
        value: vnode.state.name,
        autofocus: vnode.state.list.items.length === 0,
        oninput: (e) => this.handleInput(e, vnode),
        id: 'add-item-input',
      }),
    ])
  },
}
