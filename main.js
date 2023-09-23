import m from 'mithril'
import './globals.css'
import { App } from './pages/app'
import { inject } from '@vercel/analytics'

export const routes = [
  {
    name: 'Mes listes',
    href: '/',
    Component: App,
  },
  {
    href: '/list/:id',
    Component: App,
  },
  {
    name: 'Infos',
    href: '/info',
    Component: App,
  },
  {
    name: 'Mentions légales',
    href: '/legal',
    Component: App,
  },
]

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
// Inject analytics
inject()
