import m from 'mithril'
import { Counter } from '../components/count'

export const App = {
  view() {
    const className = 'text-red-600 text-lg'
    return m('h1', { class: className }, [
      'Try dme out ',
      m(m.route.Link, { href: '/test' }, 'Aller à la page de test'),
      m(Counter),
    ])
  },
}
