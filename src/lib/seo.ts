import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { isValidMedia } from './media'

type SEOData = {
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    metaImage?: Media | string | null
    keywords?: string | null
  } | null
}

type GenerateMetadataOptions = {
  fallbackTitle?: string
  fallbackDescription?: string
}

/**
 * Gera metadata do Next.js a partir dos dados SEO do Payload
 */
export function generateSeoMetadata(
  data: SEOData,
  options: GenerateMetadataOptions = {},
): Metadata {
  const { fallbackTitle = 'Don Manera', fallbackDescription = '' } = options
  const seo = data?.seo

  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const keywords = seo?.keywords || undefined

  const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }

  if (seo?.metaImage && isValidMedia(seo.metaImage)) {
    const imageUrl = seo.metaImage.url!
    const imageWidth = seo.metaImage.width || 1200
    const imageHeight = seo.metaImage.height || 630

    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
        },
      ],
    }

    metadata.twitter = {
      ...metadata.twitter,
      images: [imageUrl],
    }
  }

  return metadata
}
