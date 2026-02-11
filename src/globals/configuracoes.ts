import { GlobalConfig } from 'payload'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dimensões da imagem 147x96',
      },
    },
    {
      name: 'siteLogofooter',
      label: 'Logo do Rodapé',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dimensões da imagem 298x194',
      },
    },
    {
      name: 'LinkAssinatura',
      type: 'text',
      required: true,
    },
    {
      name: 'linkAndroid',
      label: 'Link para a versão Android da aplicação',
      type: 'text',
      required: true,
    },
    {
      name: 'linkIOS',
      label: 'Link para a versão iOS da aplicação',
      type: 'text',
      required: true,
    },
    {
      name: 'linkInstagram',
      type: 'text',
    },
    {
      name: 'linkYoutube',
      type: 'text',
    },
    {
      name: 'whatsapp',
      type: 'number',
    },
    {
      name: 'contactEmail',
      label: 'Email de Contato',
      type: 'email',
      required: true,
      admin: {
        description: 'Email que receberá as mensagens do formulário de contato.',
      },
    },
    {
      name: 'unidades',
      label: 'Unidades',
      type: 'array',
      fields: [
        {
          name: 'numero',
          type: 'number',
          required: true,
        },
        {
          name: 'nome',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'richText',
          required: true,
        },
        {
          name: 'openingHours',
          label: 'Horario de atendimento',
          type: 'richText',
          required: true,
        },
        {
          name: 'linkInstagram',
          type: 'text',
        },
        {
          name: 'linkWhatsapp',
          type: 'text',
        },
      ],
    },
  ],
}
