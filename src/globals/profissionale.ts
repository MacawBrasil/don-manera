import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const Profissionale: GlobalConfig = {
  slug: 'Profissionale',
  label: 'Pagina Profissionale',
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões da imagem 421x596',
          },
        },
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
      admin: {
        description: 'Dimensões da imagem 680x360',
      },
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dimensões da imagem 292x557',
      },
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
              admin: {
                description: 'Dimensões da imagem 378x322',
              },
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
              admin: {
                description: 'Dimensões da imagem 638x363',
              },
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
          admin: {
            description: 'Dimensões da imagem 1360x272',
          },
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
