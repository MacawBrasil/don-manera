import { GlobalConfig } from 'payload'
import { seoFields } from './seo'

export const Contato: GlobalConfig = {
  slug: 'contato',
  fields: [
    seoFields,
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
