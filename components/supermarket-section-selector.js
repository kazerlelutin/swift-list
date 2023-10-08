import m from 'mithril'

import { supermarketSections } from '../data/sections'

import { dc } from '../utils/dynamic-classes'

const id = 'supermarket-section-selector'

export const SupermarketSectionSelector = {
  view({ attrs: { onselect, currentSection }, state }) {
    const closeSelector = () => {
      state.open = false
      m.redraw()
    }

    // Gérer le clic en dehors de l'élément
    const handleDocumentClick = (event) => {
      const selectorElement = document.getElementById(id)

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
            id, // Ajoutez un ID à l'élément modal pour faciliter la vérification du clic en dehors
            class: dc(
              'flex flex-col',
              'rounded-md overflow-hidden',
              'border-2 border-sl-primary',
              'absolute right-0 bottom-12 left-0',
              'bg-sl-primary-bg',
              'h-64 overflow-y-auto'
            ),
          },

          supermarketSections.map((section) =>
            m(
              'div',
              {
                class: dc(
                  'p-2 cursor-pointer ease-in-out transition-all',
                  [
                    section.name === this.choice ||
                      currentSection === section.name,
                    'bg-sl-primary text-sl-secondary',
                  ],
                  'hover:bg-sl-primary hover:text-sl-secondary'
                ),
                value: section,
                key: section.name,
                onclick: () => {
                  onselect(section.name)
                  closeSelector()
                },
              },
              section.name
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
        currentSection
      ),
    ])
  },
}
