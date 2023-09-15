import m from 'mithril'
import { Counter } from '../components/count'
import { Layout } from '../components/layout'

export const App = {
  view() {
    const className = 'bg-red-600'
    return m(Layout, { class: className }, [m(Counter)])
  },
}
