import { GlobalConfig } from 'payload'
import { seoFields } from './seo'

export const Sobre: GlobalConfig = {
  slug: 'sobre',
  fields: [
    seoFields,
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'banner',
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
      ],
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'liderancaText',
      label: 'Liderança texto',
      type: 'richText',
      required: true,
    },
    {
      name: 'liderancaImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'thumbVideo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'profissionaisNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'avaliacoesNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'assinanterNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'unidadesNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
