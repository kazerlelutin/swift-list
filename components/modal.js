import m from 'mithril'

export const Modal = {
  confirm(vnode) {
    if (vnode.attrs.action) {
      vnode.attrs.action() // Exécutez la fonction d'action
      vnode.attrs.onclose() // Fermez le modal
    }
  },

  view(vnode) {
    const { title, children, open, onclose } = vnode.attrs

    if (open) {
      return m(
        'div',
        {
          class:
            'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
        },
        m(
          'div',
          {
            class:
              'bg-white rounded p-4 flex border-2 border-sl-primary flex-col gap-3 m-1',
          },
          [
            m('div', { class: 'flex justify-end gap-2' }, [
              title && m('h2', title),
              children,
            ]),
            m('div', { class: 'flex justify-end gap-3 font-bold' }, [
              m(
                'button',
                {
                  class: 'text-sl-accent-green',
                  onclick: () => this.confirm(vnode),
                },
                'Confirmer'
              ),
              m(
                'button',
                {
                  class: 'text-sl-accent-red',
                  onclick: onclose,
                },
                'Annuler'
              ),
            ]),
          ]
        )
      )
    } else {
      return null
    }
  },
}
