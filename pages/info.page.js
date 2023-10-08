import m from 'mithril'

import { Layout } from '../components/layout'

export const InfoPage = {
  view() {
    return m(
      Layout,
      m(
        'div',
        {
          class:
            'flex flex-col h-full gap-2 max-w-md m-auto overflow-y-auto p-3 mt-10',
        },
        [
          m(
            'div',
            "Bienvenue dans l'appli de liste de courses la plus délicieusement pratique du monde ! 🛒✨"
          ),
          m(
            'div',
            'Ici, tu peux créer tes listes de courses et les gérer comme si tu écrivais sur ton bon vieux papier. 📝✏️'
          ),
          m(
            'div',
            'Il te suffit de cocher les articles que tu as déjà dans ton panier et ils seront rayés, comme par magie ! 🧙‍♂️✨'
          ),
          m(
            'div',
            'Et si tu aimes cette appli et que tu veux me soutenir, tu peux ',
            m(
              'a',
              {
                href: 'https://ko-fi.com/kazerlelutin',
                class: 'text-sl-accent-blue',
                target: '_blank',
              },
              "m'offrir un café sur Ko-fi."
            ),
            ' ☕️😊'
          ),
        ]
      )
    )
  },
}
