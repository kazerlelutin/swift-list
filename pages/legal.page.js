import m from 'mithril'

import { Layout } from '../components/layout'

export const LegalPage = {
  view() {
    return m(
      Layout,
      m(
        'div',
        {
          class:
            'flex flex-col h-full gap-2 max-w-md m-auto overflow-y-auto p-3',
        },
        [
          m(
            'h1',
            { class: 'uppercase text-center font-bold text-xl' },
            'MENTIONS LÉGALES'
          ),

          m(
            'div',
            "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site ger l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi."
          ),
          m('h2', { class: 'font-bold text-lg' }, 'Edition du site'),
          m(
            'div',
            `Le présent site, accessible à l'URL suivante : `,
            m(
              'a',
              {
                href: 'https://swiftlist.ovh/',
                target: '_blank',
                class: 'text-sl-accent-blue',
              },
              'https://swiftlist.ovh/'
            ),
            `

            L'application, est édité par :
            
            Benoist Bouteiller, de nationalité Française (France).`
          ),
          m('h2', { class: 'font-bold text-lg' }, 'Hébergement'),
          m(
            'div',
            `Le Site est hébergé par la société Vercel, situé Avenue Huart Hamoir 71, 1030 Brussels, Belgium`
          ),
          m('h2', { class: 'font-bold text-lg' }, 'Nous contacter'),
          m(
            'div',
            `Pour nous contacter, veuillez visiter notre `,
            m(
              'a',
              {
                href: 'https://bouteiller.contact',
                target: '_blank',
                class: 'text-sl-accent-blue',
              },
              'page de contact'
            ),
            `.`
          ),
          m('h2', { class: 'font-bold text-lg' }, 'Données personnelles'),
          m(
            'div',
            `Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).

            Génération des mentions légales par Legalstart..`
          ),
          m(
            'h2',
            { class: 'font-bold text-lg' },
            'Charte de Protection des Données Personnelles'
          ),
          m(
            'div',
            `La présente Charte de Protection des Données Personnelles (ci-après dénommée "la Charte") a pour objectif d'expliquer comment nous respectons la confidentialité de vos données dans le cadre de l'utilisation de notre application, Swift List.`
          ),
          m(
            'div',
            `Nous tenons à vous assurer que nous ne collectons ni n'utilisons de données personnelles à des fins de suivi ou d'analyse. Nous utilisons uniquement le service Vercel Analytics pour surveiller les performances de notre application, sans recueillir de données personnelles identifiables.`
          ),
          m(
            'div',
            `Vous pouvez être tranquille en sachant que votre vie privée est importante pour nous. Nous respectons votre droit à la confidentialité et prenons toutes les mesures nécessaires pour garantir que vos données restent sécurisées et privées.`
          ),
          m(
            'div',
            `Si vous avez des questions concernant notre Charte de Protection des Données Personnelles, veuillez nous contacter à l'adresse suivante : `,
            m(
              'a',
              {
                href: 'https://bouteiller.contact',
                target: '_blank',
                class: 'text-sl-accent-blue',
              },
              'https://bouteiller.contact'
            ),
            `.`
          ),
          m(
            'div',
            `Veuillez noter que cette Charte de Protection des Données Personnelles peut être mise à jour de temps en temps. Nous vous encourageons donc à la consulter régulièrement pour vous tenir informé(e) de tout changement.`
          ),
        ]
      )
    )
  },
}
