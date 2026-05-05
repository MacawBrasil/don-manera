import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

const globalToPathsMap: Record<string, string[]> = {
  home: ['/', '/lp'],
  sobre: ['/', '/sobre', '/lp'],
  servicePage: ['/', '/servicos'],
  rimborso: ['/', '/rimborso'],
  visagismo: ['/', '/visagismo'],
  comunita: ['/', '/comunita', '/lp'],
  Profissionale: ['/', '/professionale'],
  contato: ['/contato'],
  'landing-page': ['/lp'],
  settings: [
    '/',
    '/sobre',
    '/servicos',
    '/rimborso',
    '/visagismo',
    '/comunita',
    '/professionale',
    '/contato',
    '/lp',
  ],
}

export const revalidateAfterChange: GlobalAfterChangeHook = ({ global, doc }) => {
  const slug = global.slug
  const pathsToRevalidate = globalToPathsMap[slug] || ['/']

  for (const path of pathsToRevalidate) {
    revalidatePath(path)
  }

  return doc
}
