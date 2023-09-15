import m from 'mithril'

export const Hello = {
  view() {
    return m('h1', { class: 'text-3xl font-bold underline' }, 'Hello World')
  },
}
