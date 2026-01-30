import type { Media } from '@/payload-types'

/**
 * Verifica se um campo de mídia do Payload é válido e possui URL
 */
export function isValidMedia(media: Media | string | null | undefined): media is Media {
  return Boolean(media && typeof media !== 'string' && media.url)
}

/**
 * Retorna a URL da mídia se válida, ou undefined
 */
export function getMediaUrl(media: Media | string | null | undefined): string | undefined {
  if (isValidMedia(media)) {
    return media.url ?? undefined
  }
  return undefined
}

/**
 * Retorna as dimensões da mídia se válida
 */
export function getMediaDimensions(media: Media | string | null | undefined): { width: number; height: number } | undefined {
  if (isValidMedia(media) && media.width && media.height) {
    return { width: media.width, height: media.height }
  }
  return undefined
}
