import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
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
        },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'buttonTitle', type: 'text' },
        { name: 'buttonLink', type: 'text' },
      ],
    },
    {
      name: 'appSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'richText', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'text', type: 'richText', required: true },
        { name: 'textSecondary', type: 'richText', required: true },
      ],
    },
  ],
}
