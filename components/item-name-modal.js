import m from 'mithril'

import {
  getItemByRealName,
  getShopListById,
  updateItem,
  updateShopList,
} from '../utils/idb'

import { Modal } from './modal'
import { SupermarketSectionSelector } from './supermarket-section-selector'
import { supermarketSections } from '../data/sections'

import { EditIcon } from '../icons/edit.icon'
import { InputNumber } from './input-number'
import { UnitsSelector } from './units-selector'

export const ItemNameModal = {
  oninit(vnode) {
    const { item } = vnode.attrs
    vnode.state.open = false
    vnode.state.currentSection = item.section
    vnode.state.name = item.realName
    vnode.state.quantity = item.quantity
    vnode.state.unity = item.unity
  },
  view(vnode) {
    const {
      attrs: { item, listId },
      state,
    } = vnode

    return m('div', [
      m(
        'div',
        {
          class: 'flex gap-2 items-center cursor-pointer',
          onclick: () => (state.open = true), // <-- Use state here
        },
        [
          m('div', { class: 'first-letter:uppercase' }, [
            m('span', { class: 'font-bold' }, item.name),
            m('span', { class: 'font-normal' }, ' - '),
            m('span', { class: 'font-normal' }, item.quantity),
            m(
              'span',
              { class: 'font-normal' },
              ` ${item.unity}${item.quantity > 1 ? 's' : ''}`
            ),
          ]),
          m(EditIcon),
          state.open &&
            m(Modal, {
              open: state.open,
              onclose: () => (state.open = false), // <-- Use state here
              action: async () => {
                const section = supermarketSections.find(
                  (s) => s.name === state.currentSection
                )

                const newItem = {
                  ...item,
                  section: section.name,
                  realName: state.name,
                  quantity: state.quantity,
                  unity: state.unity,
                }
                const dbItem = await getItemByRealName(item.realName)
                const list = await getShopListById(Number(listId))
                await updateItem({
                  ...dbItem,
                  realName: state.name,
                  section,
                })
                await updateShopList(
                  {
                    ...list,
                    items: list.items.map((it) =>
                      it.name === item.name ? newItem : it
                    ),
                  },
                  'update'
                )

                state.open = false // <-- Use state here
              },
              children: m(
                'div',
                {
                  class:
                    'flex flex-col justify-center gap-3 font-bold uppercase',
                },
                `Modifier ${item.name}`,
                [
                  m('input', {
                    type: 'text',
                    class: 'font-normal',
                    value: state.name,
                    onchange: (e) => (state.name = e.target.value),
                  }),

                  m(SupermarketSectionSelector, {
                    currentSection: state.currentSection,
                    onselect: (value) => (state.currentSection = value),
                  }),

                  m(
                    'div',
                    {
                      class: 'flex flex-col gap-2 mt-2',
                    },
                    [
                      m(
                        'div',
                        { class: 'flex justify-center' },
                        m(InputNumber, {
                          quantity: state.quantity,
                          onchange: (value) => (state.quantity = value),
                        })
                      ),
                      m(UnitsSelector, {
                        onselect: (unit) => {
                          state.unity = unit
                        },
                        unit: state.unity,
                        plural: state.quantity > 1,
                      }),
                    ]
                  ),
                ]
              ),
            }),
        ]
      ),
    ])
  },
}
