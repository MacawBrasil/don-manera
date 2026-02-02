import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { RichText } from '@/components/RichText'
import { VideoPlayer } from '@/components/video-player'
import { Stats } from '@/components/stats'
import { Footer } from '@/components/footer'
import { generateSeoMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'sobre',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Sobre - Don Manera',
    fallbackDescription: 'Conheça a história da Don Manera',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const page = await payload.findGlobal({
    slug: 'sobre',
    depth: 10,
  })

  return (
    <>
      <div className="relative w-full h-141.5 bg-[#151515] max-[769px]:h-125">
        <Image
          src={isValidMedia(page.hero.banner) ? page.hero.banner.url! : '/default-image.png'}
          fill
          alt=""
          className="object-cover"
        />

        <Navbar settings={settings} />
        <Container className="z-10 absolute w-full bottom-25 flex items-end justify-between left-1/2 -translate-x-1/2 max-[769px]:flex-col max-[769px]:items-start max-[769px]:gap-5 max-[769px]:bottom-1/2 max-[769px]:translate-y-1/2">
          <span className="text-bege font-intro text-6xl max-w-84 max-[769px]:text-4xl">
            {page.hero.titleBanner}
          </span>
          <RichText
            data={page.hero.description}
            className="[&_strong]:font-bold text-bege font-intro text-lg max-w-100 max-[769px]:text-base"
          />
        </Container>
      </div>

      <div className="w-full max-w-480 flex justify-between mt-21.5 pl-4 sm:pl-6 lg:pl-8 2xl:pl-57.5 max-[1025px]:flex-col max-[1025px]:gap-10 max-[769px]:px-4">
        <RichText
          data={page.text}
          className="text-[#151515] text-lg font-intro max-w-133 max-[1025px]:max-w-full max-[769px]:text-base"
        />

        <div className="w-189.25 h-104 relative max-[1367px]:w-170 max-[1280px]:w-140 max-[1025px]:w-full max-[1025px]:max-w-189">
          <Image
            src={isValidMedia(page.image) ? page.image.url! : '/default-image.png'}
            fill
            alt=""
            className="object-cover rounded-l-[30px] max-[1025px]:rounded-[30px]"
          />
        </div>
      </div>

      <Container className="mt-42.5 flex items-center justify-between max-w-300 max-[1025px]:flex-col max-[1025px]:gap-10 max-[426px]:mt-20">
        <div className="w-full max-w-191 p-0.5 bg-linear-to-br from-white via-white via-60% to-terra rounded-[17px] relative max-[768px]:bg-none max-[768px]:border-2 max-[768px]:border-terra">
          <div className="p-12 w-full h-full bg-white rounded-[17px] max-[601px]:p-6">
            <span className="text-terra text-5xl font-intro font-bold leading-11 max-[601px]:text-3xl max-[601px]:leading-8">
              Liderança <br /> que constrói
            </span>
            <RichText
              data={page.liderancaText}
              className="text-[#151515] font-intro text-lg max-w-91 mt-7 max-[601px]:text-base"
            />
            <Image
              src={
                isValidMedia(page.liderancaImage) ? page.liderancaImage.url! : '/default-image.png'
              }
              width={isValidMedia(page.liderancaImage) ? page.liderancaImage.width! : 310}
              height={isValidMedia(page.liderancaImage) ? page.liderancaImage.height! : 404}
              alt=""
              className="absolute right-3 bottom-0 max-[768px]:hidden"
            />
          </div>
        </div>

        <svg
          width={259}
          height={95}
          viewBox="0 0 259 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.248 76.861c-.618.64-2.46-.46-3.241-.697-1.31-.393-2.989.012-3.37-1.685-.815-3.645 2.375-11.436 2.954-15.458.045-.32.247-.994-.068-1.191-5.268 4.876-8.796 11.431-11.897 17.874-.736 1.528-1.258 3.292-1.954 4.786-.512 1.095-1.607 4-2.95 3.949-.325-.012-4.679-1.068-5.195-1.242-1.573-.51-1.792-2.106-1.736-3.59.208-5.24 6.454-20.603 8.785-26.057.46-1.079 2.275-5.522 3.584-5.162.432.117 4.522 2.471 5.027 2.859.264.202.742.545.804.86-1.107 2.914-2.758 5.65-3.579 8.683-.106.394-.634.776.124.691 2.017-2.398 6.027-9.139 9.122-9.718 1.034-.196 5.056 1.405 5.752 2.152 1.191 1.275.393 3.51 1.135 5.038 3.073-3.763 6.162-8.341 10.116-11.228 1.68-1.225 3.36-2.365 5.55-1.91.804.168 5.134 2.42 5.68 3.022.724.798 1.15 2.443 1.258 3.516.59 5.92-4.427 20.75-6.382 27.036-1.595 5.134-3.32 10.251-5.252 15.262l-.528.208c-.92-.461-1.915-.826-2.932-1.006-1.258-.219-3.443.478-3.426-1.297 3.471-10.943 7.92-21.627 10.802-32.76.449-1.741 1.904-7.308 1.129-8.712-.293-.433-1.04.129-1.365.337-4.36 2.741-8.791 8.274-11.538 12.616-2.747 4.342-4.443 8.386-6.415 12.83l.006-.006zM88.705 70.188c-.186-.202-1.837 1.19-2.096 1.41-3.988 3.325-7.673 6.999-12.02 9.886-2.91 1.932-9.836 6.061-13.234 4.685-.337-.135-4.511-3.387-4.915-3.792-2.73-2.696.337-7.712 2.095-10.206 4.6-6.51 12.1-13.015 19.401-16.268 3.438-1.527 9.892-4.14 13.285-1.848.663.45 1.876 2.31 2.651 2.073.562-.168 4.826-8.454 6.926-9.403 1.118-.506 4.387 2.657 5.039 3.657-2.842 4.803-5.842 9.094-7.797 14.397-.898 2.443-3.039 9.302-2.724 11.633.331 2.454 3.741 1.14 3.516 4.881-.073 1.213-1.954 6.853-3.01 7.123-.573.146-2.831-2.107-3.483-2.618-1.13-.876-2.758-1.354-3.365-2.814-.421-1.022-.77-3.887-.831-5.067-.135-2.59.242-5.179.573-7.735l-.011.006zm1.926-10.914c-1.202-.747-7.695 2.264-9.139 3-5.353 2.735-11.543 7.79-15.402 12.402-.54.64-4.668 5.938-4.067 6.46 4.864-.405 9.544-3.539 13.453-6.342 3.91-2.803 11.802-9.14 14.498-12.745.612-.815 1.197-1.781.657-2.78v.005zM237.561 70.188c-.18-.213-2.107 1.46-2.376 1.69-4.151 3.438-7.932 7.331-12.527 10.224-2.769 1.741-9.038 5.23-12.206 4.112-.859-.304-5.656-4.27-5.898-5.056-.854-2.758.882-5.87 2.343-8.083 5.201-7.88 13.863-15.015 22.744-18.261 3.106-1.135 7.487-2.725 10.504-.815.91.573 1.719 2.343 2.572 2.118.489-.124 4.635-7.022 5.82-8.252.438-.455 1.09-1.264 1.769-1.207.843.073 4.488 3.089 4.41 3.988-.056.663-3.955 6.19-4.651 7.46-1.742 3.162-3.303 6.858-4.269 10.335-.472 1.708-1.77 6.842-1.483 8.336.269 1.37 3.634 1.561 3.656 3.932.012 1.208-2.106 7.398-3.286 7.707-.764.202-1.876-1.455-2.482-1.933-3.298-2.572-4.55-1.904-4.915-6.88-.225-3.04.078-6.387.292-9.42l-.017.005zM211.16 81.141c.663.08 1.275-.028 1.916-.19 6.83-1.708 20.727-12.937 25.473-18.34 1.579-1.798 2.303-4.034-.988-3.236-7.623 1.853-16.908 8.92-22.048 14.745-.752.854-5.128 6.24-4.347 7.021h-.006zM190.095 58.953l.281-3.926c-6.212 1.505-12.296 4.702-17.261 8.718-3.893 3.146-11.1 10.28-10.847 15.582.056 1.18.236 1.601 1.359 2.028 2.899 1.1 9.589.444 12.768 0 7.038-.989 13.549-3.062 20.065-5.775 2.241-.932 4.201-2.64 6.83-2.291.073.471-.09.825-.32 1.224-2.752 4.842-18.649 9.611-24.109 10.718-8.212 1.662-12.386 2.505-19.362-2.837-4.062-3.112-4.612-5.617-2.685-10.504 3.774-9.594 19.345-22.7 29.771-23.592 3.797-.326 5.021.545 7.448 3.218 1.73 1.91 3.05 2.82 1.348 5.297-1.354 1.972-3.1 1.916-5.286 2.152v-.012zM153.843 64.83c-.646.443-3.635-1.742-4.382-2.175-.747-.432-2.32-.674-2.578-1.657-.23-.854.438-1.129.663-1.758 1.134-3.146 2.033-6.746 1.23-10.077-6.6.848-12.745 5.117-17.913 9.122-3.073 2.382-12.369 10.094-13.734 13.229-.77 1.775-3.607 12.711-4.258 13.16l-5.084-.853c-1.539-.573-.241-3.994.096-5.263 1.977-7.483 5.111-16.684 8.296-23.722.483-1.061 2.539-5.707 3.337-5.943 1.202-.36 4.303 1.713 5.432 2.399.298 1.258-2.534 6.055-3.101 7.527l.416.134c5.859-4.724 17.07-15.25 25.002-14.323 2.387.28 6.583 3.505 7.308 5.892.724 2.387.258 8.937-.152 11.656a21.288 21.288 0 01-.578 2.651z"
            fill="#673032"
          />
          <path
            d="M252.889 33.9l-3.247-8.07h-16.09l-3.247 8.07h-6.112L237.992.477h7.21L259 33.9h-6.111zm-17.237-13.37h11.889l-5.92-14.753-5.969 14.754zM215.096.477h5.729v21.2c0 8.116-5.634 12.7-14.133 12.7-8.499 0-14.18-4.536-14.18-12.7V.477h5.729v20.627c0 5.156 3.247 7.782 8.451 7.782 5.205 0 8.404-2.626 8.404-7.782V.477zM173.029 34.377c-3.963 0-8.547-.955-12.891-3.485v-6.78c4.488 3.247 9.74 4.727 13.464 4.727 3.963 0 6.828-1.48 6.828-3.963 0-7.067-20.34-2.722-20.34-14.85C160.09 3.773 165.915 0 173.888 0c3.629 0 7.783.812 11.125 2.53v6.542c-3.437-2.197-7.83-3.533-11.698-3.533-3.962 0-6.779 1.336-6.779 3.82 0 6.922 20.292 2.816 20.292 14.848 0 6.16-5.778 10.17-13.799 10.17zM141.676 5.777H122.53v7.544h18.096v5.204H122.53V28.6h19.146v5.3h-24.875V.477h24.875v5.3zM111.68 33.9h-6.876l-8.785-13.226L87.186 33.9H80.31l11.746-17.284L80.788.477h6.97l8.261 12.414L104.231.477h6.971L99.934 16.616 111.68 33.9zM69.522 33.9V.477h5.729V33.9h-5.73zM62.038 5.777H42.892v7.544h18.095v5.204H42.892V28.6h19.146v5.3H37.162V.477h24.876v5.3zM12.51.477c10.886 0 18.43 6.732 18.43 16.616 0 9.979-7.544 16.807-18.43 16.807H0V.477h12.51zm-.335 28.075c7.926 0 12.748-4.345 12.748-11.46 0-6.97-4.822-11.267-12.748-11.267H5.73v22.727h6.445z"
            fill="#151515"
          />
        </svg>
      </Container>

      <VideoPlayer
        videoUrl={isValidMedia(page.video) ? page.video.url! : ''}
        posterUrl={isValidMedia(page.thumbVideo) ? page.thumbVideo.url! : ''}
      />

      <div className="w-full mt-32">
        <Stats data={page} />
      </div>

      <Container className="flex flex-col items-center mt-24 max-[768px]:gap-20 max-[768px]:pb-10">
        <RichText
          data={page.description}
          className="text-[#151515] text-lg font-intro text-center max-[600px]:text-base max-w-210"
        />

        <div className="grid grid-cols-2 w-full max-w-220.75 gap-9 translate-y-36 max-[768px]:translate-y-0 max-[768px]:grid-cols-1">
          <div className="relative w-full h-150 max-[426px]:h-110">
            <Image
              src={isValidMedia(page.image1) ? page.image1.url! : '/default-image.png'}
              fill
              alt=""
              className="rounded-[30px] object-cover"
            />
          </div>
          <div className="relative w-full h-150 max-[426px]:h-110">
            <Image
              src={isValidMedia(page.image2) ? page.image2.url! : '/default-image.png'}
              fill
              alt=""
              className="rounded-[30px] object-cover"
            />
          </div>
        </div>
      </Container>

      <Footer data={settings} padding={true} />
    </>
  )
}
