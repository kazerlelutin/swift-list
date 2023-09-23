// Libs externes
import m from 'mithril'

// utils
import { debounce } from '../utils/debounce'
import { updateShopList } from '../utils/idb'

export const ListFormName = {
  oninit(vnode) {
    this.name = vnode.attrs.list.name
    this.list = vnode.attrs.list
  },
  saveToIDB: debounce(function () {
    updateShopList({ ...this.list, name: this.name })
  }, 300),
  handleInput(e) {
    this.name = e.target.value
    this.saveToIDB()
  },
  view() {
    return m('input', {
      type: 'text',
      value: this.name,
      autofocus: this.list.items.length === 0,
      oninput: this.handleInput.bind(this),
    })
  },
}
