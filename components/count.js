import m from 'mithril'

export const Counter = {
  count: 0,
  view(vnode) {
    const className = 'text-blue-600 text-lg'
    return m('div', [
      m(
        'button',
        {
          onclick: () => {
            vnode.state.count += 1
          },
        },
        'Increment'
      ),
      m(
        'button',
        {
          onclick: () => {
            vnode.state.count -= 1
          },
        },
        'Decrement'
      ),

      m('P', { class: className }, `Count: ${vnode.state.count}`),
    ])
  },
}
