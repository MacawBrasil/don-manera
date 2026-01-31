import { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      label: 'Título (Meta Title)',
      type: 'text',
      admin: {
        description: 'Título que aparece na aba do navegador e nos resultados de busca',
      },
    },
    {
      name: 'metaDescription',
      label: 'Descrição (Meta Description)',
      type: 'textarea',
      admin: {
        description: 'Descrição que aparece nos resultados de busca (recomendado: 150-160 caracteres)',
      },
    },
    {
      name: 'metaImage',
      label: 'Imagem (Open Graph)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Imagem que aparece ao compartilhar em redes sociais (recomendado: 1200x630px)',
      },
    },
    {
      name: 'keywords',
      label: 'Palavras-chave',
      type: 'text',
      admin: {
        description: 'Palavras-chave separadas por vírgula',
      },
    },
  ],
}
