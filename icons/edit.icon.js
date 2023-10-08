import m from 'mithril'

export const EditIcon = {
  view: () => {
    return m('div', [
      m(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          height: '1em',
          viewBox: '0 0 512 512',

          class:
            'fill-sl-accent-blue w-[18px] h-auto ease-in-out transition-all duration-300 transform rotate-0',
        },
        [
          m('path', {
            d: 'M144 272L128 384l112-16L436.7 171.3l-96-96L144 272zM512 96L416 0 363.3 52.7l96 96L512 96zM32 64H0V96 480v32H32 416h32V480 320 288H384v32V448H64V128H192h32V64H192 32z',
          }),
        ]
      ),
    ])
  },
}
