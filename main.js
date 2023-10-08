// Libs externes
import m from 'mithril'

// Styles
import './globals.css'

// Pages
import { ShopListPage } from './pages/shop-lists.page'
import { inject } from '@vercel/analytics'
import { ListPage } from './pages/list.page'
import { LegalPage } from './pages/legal.page'
import { InfoPage } from './pages/info.page'

// Routes ----------------------------------------------------------------------
export const routes = [
  {
    name: 'Mes listes',
    href: '/',
    Component: ShopListPage,
  },
  {
    href: '/list/:id',
    Component: ListPage,
  },
  {
    name: 'Infos',
    href: '/info',
    Component: InfoPage,
  },
  {
    name: 'Mentions légales',
    href: '/legal',
    Component: LegalPage,
  },
]

// Register service worker -----------------------------------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/utils/sw.js').then(
      (registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}

// App -------------------------------------------------------------------------

m.route(
  document.body,
  '/',
  routes.reduce(
    (acc, route) => ({
      ...acc,
      [route.href]: route.Component,
    }),
    {}
  )
)
// Inject analytics ------------------------------------------------------------
inject()
