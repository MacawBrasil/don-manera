import { GlobalConfig } from 'payload'
import { seoFields } from './seo'
import { revalidateAfterChange } from '@/hooks/revalidate'
import { createMediaBlocksField } from '@/fields/mediaBlocks'

export const Sobre: GlobalConfig = {
  slug: 'sobre',
  hooks: {
    afterChange: [revalidateAfterChange],
  },
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
          admin: {
            description: 'Dimensões da imagem 1660x566',
          },
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
      admin: {
        description: 'Dimensões da imagem 757x416',
      },
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
      admin: {
        description: 'Dimensões da imagem 310x530',
      },
    },
    createMediaBlocksField({
      imageDescription: 'Dimensões da imagem 1200x650',
      videoDescription: 'Dimensões do vídeo 1200x650. Tamanho máximo de 5MB',
      posterDescription: 'Dimensões da imagem 1200x650',
    }),
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'thumbVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        hidden: true,
      },
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
      admin: {
        description: 'Dimensões da imagem 423x600',
      },
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dimensões da imagem 423x600',
      },
    },
  ],
}
