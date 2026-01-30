import { GlobalConfig } from 'payload'

export const Contato: GlobalConfig = {
  slug: 'contato',
  fields: [
    {
      name: 'work',
      label: 'Junte-se a equipe',
      type: 'group',
      fields: [
        {
          name: 'banner',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'titleBanner',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'advantages',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
