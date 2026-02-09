import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    seoFields,
    {
      name: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'slides',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'slideText',
              type: 'richText',
            },
            {
              name: 'slideImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Dimensões da imagem 1660x920',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'exclusiveServices',
      type: 'group',
      label: 'Serviços Exclusivos',
      fields: [
        {
          name: 'title',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 1660x380',
          },
        },
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
    {
      name: 'bannerGroup',
      type: 'group',
      fields: [
        {
          name: 'image1',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 830x436',
          },
        },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 680x436',
          },
        },
      ],
    },
    {
      name: 'brandSection',
      label: 'Seção deixe sua marca',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 650x852',
          },
        },
        {
          name: 'buttonTitle',
          type: 'text',
        },
        {
          name: 'buttonLink',
          type: 'text',
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 1200x630. Tamanho máximo de 5MB',
          },
        },
      ],
    },
    {
      name: 'benefitsSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'differencesSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'proffissionaleSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'subscriptionBanner',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 1660x500',
          },
        },
        { name: 'buttonTitle', type: 'text' },
        { name: 'buttonLink', type: 'text' },
      ],
    },
    {
      name: 'appSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 581x624',
          },
        },
        { name: 'text', type: 'richText', required: true },
        { name: 'textSecondary', type: 'richText', required: true },
      ],
    },
  ],
}
