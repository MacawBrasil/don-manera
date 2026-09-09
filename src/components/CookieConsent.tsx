'use client'

import { useEffect } from 'react'

import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CC from 'vanilla-cookieconsent'

export default function CookieConsent() {
  useEffect(() => {
    CC.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          flipButtons: false,
          equalWeightButtons: true,
        },
        preferencesModal: {
          layout: 'box',
          // position: 'left right',
          flipButtons: false,
          equalWeightButtons: true,
        },
      },

      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {},
      },

      language: {
        default: 'pt',
        translations: {
          pt: {
            consentModal: {
              title: 'Controle sua privacidade',
              description:
                'Nosso site utiliza cookies para melhorar sua experiência. Você pode aceitar todos os cookies ou gerenciar suas preferências.',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Recusar todos',
              showPreferencesBtn: 'Gerenciar preferências',
            },
            preferencesModal: {
              title: 'Gerenciar preferências de cookies',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Recusar todos',
              savePreferencesBtn: 'Salvar preferências',
              closeIconLabel: 'Fechar',
              sections: [
                {
                  title: 'Cookies Necessários',
                  description:
                    'Estes cookies são essenciais para o funcionamento do site e não podem ser desativados.',

                  linkedCategory: 'necessary',
                },
                {
                  title: 'Performance e Analytics',
                  description:
                    'Estes cookies coletam informações sobre como você usa nosso site. Todos os dados são anonimizados e não podem ser usados para identificá-lo.',
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
    })
  }, [])

  return null
}
