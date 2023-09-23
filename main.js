import m from 'mithril'
import './globals.css'
import { App } from './pages/app'

export const routes = [
  {
    name: 'Home',
    href: '/',
    Component: App,
  },
  {
    name: 'Mes listes',
    href: '/about',
    Component: App,
  },
  {
    name: 'Contact',
    href: '/contact',
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
