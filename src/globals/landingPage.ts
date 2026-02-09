import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const landingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    seoFields,
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'logo1', type: 'upload', relationTo: 'media' },
        { name: 'logo2', type: 'upload', relationTo: 'media' },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Dimensões da imagem 1660x660',
          },
        },
      ],
      required: true,
    },
    {
      name: 'benefitsSection',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            description: 'Dimensões da imagem 913x364',
          },
        },
        { name: 'description', type: 'richText', required: true },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'benefit', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'bannerFooter',
      type: 'group',
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            description: 'Dimensões da imagem 1660x791',
          },
        },
        { name: 'title', type: 'richText', required: true },
        {
          name: 'buttonTitle',
          type: 'text',
        },
        {
          name: 'buttonLink',
          type: 'text',
        },
      ],
    },
  ],
}
