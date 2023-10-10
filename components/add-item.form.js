import m from 'mithril'

import { getShopListById, updateShopList } from '../utils/idb'

import { units } from '../data/units'

import { InputNumber } from './input-number'
import { UnitsSelector } from './units-selector'
import { ValidateList } from './validate-list'

export const addItemForm = {
  oninit(vnode) {
    vnode.state.quantity = 1
    vnode.state.unity = units[0]
    vnode.state.item = ''
  },

  async saveToIDB(e, state) {
    e.preventDefault()

    const id = Number(m.route.param('id'))
    const list = await getShopListById(id)
    const items = [
      ...list.items.filter((it) => it.name !== state.item),
      {
        name: state.item.trim().toLowerCase(),
        section: '',
        quantity: state.quantity,
        checked: false,
        realName: state.item.trim().toLowerCase(),
        unity: state.unity || units[0],
      },
    ]
    await updateShopList({
      ...list,
      items: items.filter((item) => !!item.name.toLowerCase().trim()),
    })
    state.item = ''
    state.unity = units[0]
    state.quantity = 1
  },

  handleInput(e, state) {
    state.item = e.target.value
  },

  view(vnode) {
    const state = vnode.state

    return m(
      'form',
      {
        class: 'grid grid-cols-[auto_1fr] gap-2',
        onsubmit: (e) => this.saveToIDB(e, state),
      },
      [
        m(InputNumber, {
          quantity: state.quantity,
          onchange: (value) => (state.quantity = value),
        }),
        m(UnitsSelector, {
          onselect: (unit) => {
            state.unity = unit
          },
          unit: state.unity,
          plural: state.quantity > 1,
        }),
        m('input', {
          class: 'p-2 rounded-md border-2 border-sl-primary col-span-2',
          type: 'text',
          value: state.item,
          placeholder: 'Ajouter un article',
          oninput: (e) => this.handleInput(e, state),
          id: 'add-item-input',
        }),
        m(ValidateList),
        m(
          'button',
          {
            class: 'bg-sl-accent-green p-2 text-sl-secondary rounded-md',
            type: 'submit',
          },
          'Ajouter'
        ),
      ]
    )
  },
}
