import m from 'mithril'

export const InputNumber = {
  increment(quantity, onchange) {
    if (quantity >= 10 && quantity < 100) {
      onchange(quantity + 10)
    } else if (quantity >= 100 && quantity < 1000) {
      onchange(quantity + 100)
    } else {
      onchange(quantity + 1)
    }
  },
  decrement(quantity, onchange) {
    if (quantity > 10 && quantity <= 100) {
      onchange(quantity - 10)
    } else if (quantity > 100 && quantity <= 1000) {
      onchange(quantity - 100)
    } else {
      onchange(quantity - 1)
    }
  },
  view({ attrs: { onchange, quantity } }) {
    return m('div', { class: 'flex gap-1' }, [
      m(
        'button',
        {
          type: 'button',
          class: 'bg-sl-primary text-sl-secondary p-2 text-xl rounded-md w-10',
          onclick: () => this.decrement(quantity, onchange),
        },
        '-'
      ),
      m('input', {
        class: 'p-2 rounded-md border-2 border-sl-primary col-span-2 w-20',
        type: 'number',
        value: quantity,
      }),
      m(
        'button',
        {
          type: 'button',
          class: 'bg-sl-primary text-sl-secondary p-2 text-xl rounded-md w-10',
          onclick: () => this.increment(quantity, onchange),
        },
        '+'
      ),
    ])
  },
}
