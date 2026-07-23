import type { Block, Field } from 'payload'

type MediaBlocksFieldOptions = {
  name?: string
  label?: string
  imageDescription?: string
  videoDescription?: string
  posterDescription?: string
}

const createImageBlock = (description?: string): Block => ({
  slug: 'image',
  labels: {
    singular: 'Imagem',
    plural: 'Imagens',
  },
  fields: [
    {
      name: 'image',
      label: 'Imagem',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description,
      },
    },
  ],
})

const createVideoBlock = (videoDescription?: string, posterDescription?: string): Block => ({
  slug: 'video',
  labels: {
    singular: 'Vídeo',
    plural: 'Vídeos',
  },
  fields: [
    {
      name: 'video',
      label: 'Vídeo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: videoDescription,
      },
    },
    {
      name: 'poster',
      label: 'Imagem de capa',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: posterDescription,
      },
    },
  ],
})

export const createMediaBlocksField = ({
  name = 'media',
  label = 'Mídia',
  imageDescription,
  videoDescription,
  posterDescription,
}: MediaBlocksFieldOptions = {}): Field => ({
  name,
  label,
  type: 'blocks',
  required: true,
  minRows: 1,
  maxRows: 1,
  blocks: [
    createImageBlock(imageDescription),
    createVideoBlock(videoDescription, posterDescription),
  ],
  admin: {
    description: 'Escolha uma imagem ou um vídeo para exibir nesta seção.',
  },
})
