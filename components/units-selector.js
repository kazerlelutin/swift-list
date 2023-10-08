import m from 'mithril'

import { dc } from '../utils/dynamic-classes'
import { units } from '../data/units'

export const UnitsSelector = {
  view({ attrs: { onselect, unit, plural }, state }) {
    const closeSelector = () => {
      state.open = false
      m.redraw()
    }

    // Gérer le clic en dehors de l'élément
    const handleDocumentClick = (event) => {
      const selectorElement = document.getElementById('unit-selector')

      if (selectorElement && !selectorElement.contains(event.target)) {
        closeSelector()
        document.removeEventListener('click', handleDocumentClick)
      }
    }

    return m('div', { class: 'relative' }, [
      // Modal
      state.open &&
        m(
          'div',
          {
            id: 'unit-selector', // Ajoutez un ID à l'élément modal pour faciliter la vérification du clic en dehors
            class: dc(
              'flex flex-col',
              'rounded-md overflow-hidden',
              'border-2 border-sl-primary',
              'absolute right-0 bottom-12 left-0',
              'bg-sl-primary-bg'
            ),
          },

          units.map((unity) =>
            m(
              'div',
              {
                class: dc(
                  'p-2 cursor-pointer ease-in-out transition-all',
                  [
                    unity === unit || (!unit && unity === units[0]),
                    'bg-sl-primary text-sl-secondary',
                  ],
                  'hover:bg-sl-primary hover:text-sl-secondary'
                ),
                value: unity,
                key: unity,
                onclick: () => {
                  onselect(unity)
                  closeSelector()
                },
              },
              `${unity}${plural ? 's' : ''}`
            )
          )
        ),
      // Input
      m(
        'div',
        {
          class: 'p-2 rounded-md border-2 border-sl-primary',
          onclick: () => {
            state.open = !state.open
            if (state.open) {
              document.addEventListener('click', handleDocumentClick)
            } else {
              document.removeEventListener('click', handleDocumentClick)
            }
          },
        },
        `${unit || units[0]}${plural ? 's' : ''}`
      ),
    ])
  },
}
