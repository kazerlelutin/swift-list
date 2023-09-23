import m from 'mithril'

export const HamburgerIcon = {
  view: () => {
    return m('div', [
      m(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          height: '1em',
          viewBox: '0 0 448 512',

          class: 'fill-sl-accent-blue w-[28px] h-auto',
        },
        [
          m('path', {
            d: 'M0 64H448v64H0V64zM0 224H448v64H0V224zM448 384v64H0V384H448z',
          }),
        ]
      ),
    ])
  },
}
