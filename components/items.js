import m from 'mithril'

import { supermarketSections } from '../data/sections'

import { Section } from './section'

export const Items = {
  view(vnode) {
    const section = supermarketSections.filter((section) =>
      vnode.attrs.list.find((item) => item.section === section.name)
    )
    return section.map((section) =>
      m(Section, {
        section,
        list: vnode.attrs.list,
        listId: vnode.attrs.id,
        key: section.name,
        listState: vnode.attrs.listState,
      })
    )
  },
}
