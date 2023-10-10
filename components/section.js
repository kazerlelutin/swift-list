import m from 'mithril'

import { dc } from '../utils/dynamic-classes'
import { config } from '../utils/config'

import { ItemName } from './item-name'
import { ItemNameReady } from './item-name-ready'

import { ChevronIcon } from '../icons/chevron.icon'

export const Section = {
  oninit(vnode) {
    vnode.state.open = true
  },
  view(vnode) {
    const { section, list, listState, listId } = vnode.attrs
    const total = list.filter((item) => item.section === section.name).length
    const checked = list.filter(
      (item) => item.section === section.name && item.checked
    ).length

    const progress =
      listState === config.listState.ready ? ` (${checked}/${total})` : ''

    return m(
      'div',
      { key: section.name, class: 'flex flex-col gap-2 pb-3 px-1' },
      [
        m(
          'div',
          {
            class: dc(
              'flex gap-1 justify-between cursor-pointer',
              'item-center pl-1 pr-2',
              [checked === total, 'text-sl-accent-green', 'text-sl-accent-blue']
            ),
            onclick: () => {
              vnode.state.open = !vnode.state.open
            },
          },
          [
            `${section.icon} ${section.name}${progress}`,
            m(
              'div',
              {
                class: dc(
                  'ease-in-out transition-all flex h-full items-center justify-center',
                  [vnode.state.open, 'rotate-180']
                ),
              },
              m(ChevronIcon)
            ),
          ]
        ),
        !vnode.state.open
          ? m(
              'div',
              { class: 'text-sm opacity-50 italic' },
              section.description
            )
          : list
              .filter((item) => item.section === section.name)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) =>
                m(
                  listState !== config.listState.draft
                    ? ItemNameReady
                    : ItemName,
                  {
                    key: item.name,
                    item,
                    listId,
                    listState,
                  }
                )
              ),
      ]
    )
  },
}
