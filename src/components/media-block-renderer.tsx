import Image from 'next/image'
import type { Media } from '@/payload-types'
import { getMediaUrl, isValidMedia } from '@/lib/media'
import { VideoPlayer } from '@/components/video-player'
import { VideoPlayerStatic } from '@/components/video-player-static'

export type MediaUpload = string | Media | null | undefined

type MediaBlock = {
  blockType?: string | null
  image?: MediaUpload
  video?: MediaUpload
  poster?: MediaUpload
}

type MediaBlockRendererProps = {
  blocks?: MediaBlock[] | null
  fallbackVideo?: MediaUpload
  fallbackPoster?: MediaUpload
  variant?: 'default' | 'static'
}

const imageWrapperClassNames = {
  default:
    'relative w-11/12 mx-auto mt-28 max-w-300 h-157.5 rounded-[45px] overflow-hidden max-[601px]:h-100',
  static:
    'absolute -top-45.5 w-11/12 max-w-300 h-157.5 rounded-[45px] overflow-hidden max-[601px]:h-100 max-[601px]:relative max-[601px]:top-0 max-[601px]:left-0',
}

function MediaImage({ media, variant }: { media: MediaUpload; variant: 'default' | 'static' }) {
  if (!isValidMedia(media)) {
    return null
  }

  return (
    <div className={imageWrapperClassNames[variant]}>
      <Image
        src={media.url!}
        fill
        alt={media.alt ?? ''}
        quality={100}
        className="h-full w-full rounded-[45px] object-cover"
      />
    </div>
  )
}

function MediaVideo({
  video,
  poster,
  variant,
}: {
  video: MediaUpload
  poster?: MediaUpload
  variant: 'default' | 'static'
}) {
  const videoUrl = getMediaUrl(video)

  if (!videoUrl) {
    return null
  }

  const posterUrl = getMediaUrl(poster)
  const Player = variant === 'static' ? VideoPlayerStatic : VideoPlayer

  return <Player videoUrl={videoUrl} posterUrl={posterUrl} />
}

export function MediaBlockRenderer({
  blocks,
  fallbackVideo,
  fallbackPoster,
  variant = 'default',
}: MediaBlockRendererProps) {
  const block = blocks?.[0]

  if (block?.blockType === 'image') {
    return <MediaImage media={block.image} variant={variant} />
  }

  if (block?.blockType === 'video') {
    return (
      <MediaVideo video={block.video} poster={block.poster ?? fallbackPoster} variant={variant} />
    )
  }

  return <MediaVideo video={fallbackVideo} poster={fallbackPoster} variant={variant} />
}
