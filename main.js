import m from 'mithril'
import './globals.css'
import { App } from './pages/app'
import { Hello } from './pages/hello'

//m.route.prefix = ''

m.route(document.body, '/', {
  '/': App,
  '/test': Hello,
})
