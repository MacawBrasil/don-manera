import { GlobalConfig } from 'payload'
import { seoFields } from './seo'

export const Profissionale: GlobalConfig = {
  slug: 'Profissionale',
  label: 'Pagina Profissionale',
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
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
    {
      name: 'imageHero',
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
    {
      name: 'about',
      label: 'Sobre',
      type: 'group',
      required: true,
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
          name: 'modules',
          label: 'Modulos',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'educatorsSection',
      label: 'Secao Educadores',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'richText',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'educators',
          label: 'Educadores',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'modulesSection',
      label: 'Secao Modulos',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'modules',
          label: 'Modulos',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'icon',
              label: 'icone',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'color',
              label: 'Exemplo: #FF5733',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'richText',
              required: true,
            },
            {
              name: 'title',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'description2',
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
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'banner',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
