import { GlobalConfig } from 'payload'

export const rimborso: GlobalConfig = {
  slug: 'rimborso',
  label: 'Rimborso',
  fields: [
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
      name: 'pointsAndChanges',
      label: 'Pontos e trocas',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'description', type: 'richText', required: true },
            { name: 'points', type: 'text', required: true },
          ],
        },
        { name: 'text1', type: 'richText', required: true },
        { name: 'text2', type: 'richText', required: true },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonLink', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          maxRows: 4,
          fields: [{ name: 'description', type: 'richText', required: true }],
        },
      ],
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
