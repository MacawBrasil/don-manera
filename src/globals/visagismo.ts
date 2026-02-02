import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const visagismo: GlobalConfig = {
  slug: 'visagismo',
  label: 'Visagismo',
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
      name: 'sectionResults',
      label: 'Secao resultados',
      type: 'group',
      fields: [
        { name: 'description', type: 'richText', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'beforeImage', type: 'upload', relationTo: 'media' },
            { name: 'afterImage', type: 'upload', relationTo: 'media' },
            { name: 'description', type: 'richText' },
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
