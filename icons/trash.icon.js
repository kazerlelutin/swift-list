import m from 'mithril'

export const TrashIcon = {
  view: () => {
    return m('div', [
      m(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 448 512',

          class:
            'fill-sl-accent-red w-[15px] h-auto ease-in-out transition-all duration-300 transform rotate-0',
        },
        [
          m('path', {
            d: 'M144 0H304l16 32H448V96H0V32H128L144 0zM32 128H416V512H32V128zm112 64H112v16V432v16h32V432 208 192zm96 0H208v16V432v16h32V432 208 192zm96 0H304v16V432v16h32V432 208 192z',
          }),
        ]
      ),
    ])
  },
}
