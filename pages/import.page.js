import m from 'mithril'

import { units } from '../data/units'
import { addShopList, openDatabase } from '../utils/idb'

import { Layout } from '../components/layout'
import { convertBase64ToTxt } from '../utils/convert-to-base64'

export const ImportPage = {
  async oninit(vnode) {
    const str = convertBase64ToTxt(vnode.attrs.base)
    const strItems = str.split('|')

    await openDatabase()
    try {
      const items = strItems.map((item) => {
        const [realName, quantity, unity] = item.split(',')
        return {
          name: realName,
          realName,
          quantity: Number(quantity) || 1,
          unity: units.find((u) => u.startsWith(unity)) ?? 'unité',
          checked: false,
        }
      })

      const name = `import ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`

      const newList = await addShopList({
        name,
        items,
        state: 'brouillon',
      })
      m.route.set('/list/' + newList)
    } catch (e) {
      vnode.state.error = true
    }
  },
  view(vnode) {
    return m(
      Layout,
      m(
        'div',
        {
          class:
            'flex h-full gap-2 items-center justify-center px-10 text-center',
        },
        vnode.state.error
          ? m('div', "Erreur lors de l'importation")
          : 'Chargement...'
      )
    )
  },
}
