import m from 'mithril'

export const ChevronIcon = {
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
            d: 'M256 82.7l22.6 22.6 192 192L493.3 320 448 365.3l-22.6-22.6L256 173.3 86.6 342.6 64 365.3 18.7 320l22.6-22.6 192-192L256 82.7z',
          }),
        ]
      ),
    ])
  },
}
