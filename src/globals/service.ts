import { GlobalConfig } from 'payload'

export const service: GlobalConfig = {
  slug: 'servicePage',
  label: 'Página de Serviços',
  fields: [
    {
      name: 'title',
      type: 'richText',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'activeHome',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
