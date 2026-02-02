import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const comunita: GlobalConfig = {
  slug: 'comunita',
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    seoFields,
    {
      name: 'thumbInfo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
      required: true,
    },
    {
      name: 'imageHero',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sectionAbout',
      label: 'Secao sobre',
      type: 'group',
      fields: [
        { name: 'description1', type: 'richText', required: true },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'title', type: 'text' }],
        },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonLink', type: 'text', required: true },
      ],
      required: true,
    },
    {
      name: 'sectionPlans',
      label: 'Secao de planos',
      type: 'group',
      fields: [
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'plans',
          type: 'array',
          fields: [
            { name: 'color', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'prices',
              type: 'array',
              fields: [
                {
                  name: 'price',
                  type: 'group',
                  required: true,
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'text', required: true },
                    { name: 'price', type: 'text', required: true },
                    { name: 'link', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'benefits',
              type: 'array',
              fields: [{ name: 'benefit', type: 'text', required: true }],
            },
          ],
        },
      ],
      required: true,
    },
    {
      name: 'faq',
      label: 'FAQ',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'questions',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
