import { Hero } from '@/components/hero'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { Container } from '@/components/container'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { VideoPlayerStatic } from '@/components/video-player-static'
import { Footer } from '@/components/footer'
import { BrandSection } from '@/components/brand-section'
import { generateSeoMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata() {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'home',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Don Manera',
    fallbackDescription: 'Barbearia Don Manera',
  })
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findGlobal({
    slug: 'home',
    depth: 10,
  })

  const rimborso = await payload.findGlobal({
    slug: 'rimborso',
    depth: 10,
  })

  const profissionale = await payload.findGlobal({
    slug: 'Profissionale',
    depth: 10,
  })

  const visagismo = await payload.findGlobal({
    slug: 'visagismo',
    depth: 10,
  })

  const comunita = await payload.findGlobal({
    slug: 'comunita',
    depth: 10,
  })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const sobre = await payload.findGlobal({
    slug: 'sobre',
    depth: 10,
    select: {
      profissionaisNumber: true,
      avaliacoesNumber: true,
      assinanterNumber: true,
      unidadesNumber: true,
    },
  })

  const { services } = await payload.findGlobal({
    slug: 'servicePage',
    depth: 10,
    select: {
      services: true,
    },
  })

  const exclusiveServices = services.filter((service) => service.activeHome).slice(0, 4)

  return (
    <>
      <Hero data={{ Hero: page.Hero }} settings={settings} />
      <div className="w-full relative h-95 flex items-center">
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={
              isValidMedia(page.exclusiveServices.image)
                ? page.exclusiveServices.image.url!
                : '/hero.png'
            }
            alt="Banner Image"
            fill
            priority
            className="object-left object-cover grayscale mix-blend-multiply"
          />
        </div>

        <Container className="">
          <RichText
            data={page.exclusiveServices.title}
            className="text-bege text-5xl font-intro font-light leading-11 max-[601px]:text-3xl max-[601px]:leading-8"
          />
        </Container>
      </div>

      <div className="w-full bg-bege h-128 max-[1000px]:h-auto">
        <Container className="h-115 flex flex-col justify-end max-[1000px]:h-auto max-[1000px]:pt-20">
          <div className="grid grid-cols-4 items-end gap-5 max-[1000px]:grid-cols-2 max-[601px]:grid-cols-1">
            {exclusiveServices.map((service) => (
              <div
                key={service.id}
                className="h-77 border-2 border-terra rounded-[40px] px-3 pt-3 flex flex-col group items-center transition-all duration-300 hover:h-115 max-[1000px]:h-96 max-[1000px]:hover:h-96"
              >
                <div className="relative w-full h-23.75 rounded-[30px] overflow-hidden transition-all duration-300 group-hover:h-61.5 max-[1000px]:group-hover:h-52 max-[1000px]:h-52">
                  <Image
                    src={isValidMedia(service.image) ? service.image.url! : '/hero.png'}
                    alt="Service Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start mt-2 w-full pl-6 max-[1225px]:pl-0">
                  <h3 className="line-clamp-2 text-terra text-2xl font-intro max-[1225px]:text-xl">
                    {service.title}
                  </h3>
                  <p className="text-center mb-4 text-terra font-light font-intro text-4xl max-[1225px]:text-2xl">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-5 max-[600px]:flex-col max-[601px]:items-start">
            <Link href={''}>
              <Button variant={'terra'}>Agende agora</Button>
            </Link>
            <Link href={'/servicos'}>
              <Button
                variant={'primary'}
                className="text-[#151515] border-[#151515] hover:text-[#151515]"
              >
                Todos os serviços
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <BrandSection
        bannerGroup={page.bannerGroup}
        brandSection={page.brandSection}
        statsData={sobre}
      />

      <div className="w-full bg-terra pt-148 flex flex-col items-center relative max-[601px]:gap-40 max-[601px]:pt-40 pb-14">
        <VideoPlayerStatic
          videoUrl={isValidMedia(page.brandSection.video) ? page.brandSection.video.url! : ''}
          posterUrl="/poster-video.png"
        />

        <Container>
          <div className="flex items-center max-[1281px]:grid max-[1281px]:grid-cols-1 max-[1281px]:gap-6">
            <div className="h-96 w-154 rounded-2xl p-0.5 bg-linear-to-br from-bege via-terra via-45% to-[#6E2D39] relative max-[1281px]:mx-auto max-[1025px]:w-full">
              <div className="w-full h-full inset-0 bg-terra rounded-2xl pt-18.25 pl-25.75 flex flex-col gap-5 max-[769px]:pt-0 max-[769px]:pl-0 max-[769px]:items-center max-[769px]:justify-center max-[769px]:text-center">
                <RichText
                  data={page.benefitsSection.title}
                  className="text-bege font-intro text-5xl font-light leading-11.25 max-[769px]:text-3xl max-[769px]:leading-8"
                />
                <p className="text-bege text-lg font-intro max-w-89.25 leading-6 font-light max-[769px]:text-base">
                  {page.benefitsSection.description}
                </p>
              </div>
            </div>
            <Link
              href={'/rimborso'}
              className="relative w-207 h-105 rounded-[44px] overflow-hidden -ml-8 group max-[1281px]:mx-auto max-[1025px]:w-full"
            >
              <Image
                src={
                  isValidMedia(rimborso.thumbInfo.image)
                    ? rimborso.thumbInfo.image.url!
                    : '/hero.png'
                }
                fill
                alt="Thumb Rimborso"
                className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-75"
              />
              {/* Overlay com conteúdo */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-4">
                  {/* Logo */}
                  {isValidMedia(rimborso.thumbInfo.logo) && (
                    <Image
                      src={rimborso.thumbInfo.logo.url!}
                      width={rimborso.thumbInfo.logo.width!}
                      height={rimborso.thumbInfo.logo.height!}
                      alt="Logo Rimborso"
                      className="max-w-51.75 h-auto translate-y-28 transition-all group-hover:translate-y-0 duration-300"
                    />
                  )}

                  {/* Descrição - aparece no hover */}
                  <p className="text-[#FAFFFC] mt-14 mb-8 text-center text-lg max-w-48.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {rimborso.thumbInfo.description}
                  </p>

                  {/* Ícone + - aparece no hover */}
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z"
                      fill="#fff"
                    />
                    <path
                      d="M22.031 14.121H15.88V7.97a.879.879 0 00-1.758 0v6.152H7.97a.879.879 0 000 1.758h6.152v6.152a.879.879 0 101.758 0V15.88h6.152a.879.879 0 100-1.758z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-between mt-35.75 max-[769px]:mt-20 relative max-[1281px]:grid max-[1281px]:grid-cols-2 max-[1281px]:gap-6 max-[768px]:grid max-[768px]:grid-cols-1 max-[769px]:gap-6">
            <Link
              href={'/comunita'}
              className="relative w-105.25 h-149 rounded-4xl overflow-hidden group z-10 max-[1281px]:order-2 max-[1281px]:w-full max-[769px]:h-105"
            >
              <Image
                src={
                  isValidMedia(comunita.thumbInfo.image)
                    ? comunita.thumbInfo.image.url!
                    : '/hero.png'
                }
                fill
                alt="Thumb Rimborso"
                className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-75"
              />
              {/* Overlay com conteúdo */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-4">
                  {/* Logo */}
                  {isValidMedia(comunita.thumbInfo.logo) && (
                    <Image
                      src={comunita.thumbInfo.logo.url!}
                      width={comunita.thumbInfo.logo.width!}
                      height={comunita.thumbInfo.logo.height!}
                      alt="Logo Comunita"
                      className="max-w-32 h-auto translate-y-28 transition-all group-hover:translate-y-0 duration-300"
                    />
                  )}

                  {/* Descrição - aparece no hover */}
                  <p className="text-[#FAFFFC] mt-14 mb-8 text-center text-lg max-w-48.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {comunita.thumbInfo.description}
                  </p>

                  {/* Ícone + - aparece no hover */}
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z"
                      fill="#fff"
                    />
                    <path
                      d="M22.031 14.121H15.88V7.97a.879.879 0 00-1.758 0v6.152H7.97a.879.879 0 000 1.758h6.152v6.152a.879.879 0 101.758 0V15.88h6.152a.879.879 0 100-1.758z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <div className="h-96 w-176.25 absolute top-1/2 -translate-1/2 left-1/2 rounded-2xl p-0.5 bg-linear-to-tl from-bege via-terra via-45% to-[#6E2D39] max-[1281px]:static max-[1281px]:top-0 max-[1281px]:left-0 max-[1281px]:translate-0 max-[1281px]:col-span-2 max-[1281px]:mx-auto max-[1025px]:w-full max-[769px]:col-span-1">
              <div className="w-full h-full inset-0 bg-terra rounded-2xl text-center flex flex-col gap-5 items-center justify-center">
                <RichText
                  data={page.differencesSection.title}
                  className="text-bege font-intro text-5xl font-light leading-11.25 max-[769px]:leading-8 max-[769px]:text-3xl"
                />
                <p className="text-bege text-lg font-intro max-w-89.25 leading-6 font-light max-[769px]:text-base">
                  {page.differencesSection.description}
                </p>
              </div>
            </div>

            <Link
              href={'/visagismo'}
              className="relative w-105.25 h-149 rounded-4xl overflow-hidden group z-10 max-[1281px]:w-full max-[769px]:h-105"
            >
              <Image
                src={
                  isValidMedia(visagismo.thumbInfo.image)
                    ? visagismo.thumbInfo.image.url!
                    : '/hero.png'
                }
                fill
                alt="Thumb Rimborso"
                className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-75"
              />
              {/* Overlay com conteúdo */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-4">
                  <span className="text-white font-intro font-bold text-5xl translate-y-28 transition-all group-hover:translate-y-0 duration-300 max-[769px]:text-3xl max-[769px]:leading-8">
                    {visagismo.thumbInfo.title}
                  </span>

                  {/* Descrição - aparece no hover */}
                  <p className="text-[#FAFFFC] mt-14 mb-8 text-center text-lg max-w-48.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {visagismo.thumbInfo.description}
                  </p>

                  {/* Ícone + - aparece no hover */}
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z"
                      fill="#fff"
                    />
                    <path
                      d="M22.031 14.121H15.88V7.97a.879.879 0 00-1.758 0v6.152H7.97a.879.879 0 000 1.758h6.152v6.152a.879.879 0 101.758 0V15.88h6.152a.879.879 0 100-1.758z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex mt-28 max-[769px]:mt-20 w-full justify-center max-[1281px]:grid max-[1281px]:grid-cols-1 max-[1281px]:gap-6">
            <div className="h-111.5 w-157.75 mt-8 rounded-2xl p-0.5 bg-linear-to-br from-bege via-terra via-45% to-[#6E2D39] relative max-[1281px]:mx-auto max-[1025px]:w-full">
              <div className="w-full h-full inset-0 bg-terra rounded-2xl pt-18.25 pl-25.75 flex flex-col gap-5 max-[769px]:pl-0 max-[769px]:pt-0 max-[769px]:items-center max-[769px]:justify-center max-[769px]:text-center">
                <RichText
                  data={page.proffissionaleSection.title}
                  className="text-bege font-intro text-5xl font-light leading-11.25 max-[769px]:text-3xl max-[769px]:leading-8"
                />
                <p className="text-bege text-lg font-intro max-w-89.25 leading-6 font-light max-[769px]:text-base">
                  {page.proffissionaleSection.description}
                </p>
              </div>
            </div>

            <Link
              href={'/professionale'}
              className="relative w-105.25 h-149 rounded-4xl overflow-hidden -ml-24 group z-10 max-[1281px]:mx-auto max-[1281px]:w-220 max-[1025px]:w-full max-[769px]:h-105"
            >
              <Image
                src={
                  isValidMedia(profissionale.thumbInfo.image)
                    ? profissionale.thumbInfo.image.url!
                    : '/hero.png'
                }
                fill
                alt="Thumb Rimborso"
                className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-75 max-[1281px]:object-top"
              />
              {/* Overlay com conteúdo */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-4">
                  {/* Logo */}
                  {isValidMedia(profissionale.thumbInfo.logo) && (
                    <Image
                      src={profissionale.thumbInfo.logo.url!}
                      width={profissionale.thumbInfo.logo.width!}
                      height={profissionale.thumbInfo.logo.height!}
                      alt="Logo Comunita"
                      className="max-w-32 h-auto translate-y-28 transition-all group-hover:translate-y-0 duration-300"
                    />
                  )}

                  {/* Descrição - aparece no hover */}
                  <p className="text-[#FAFFFC] mt-14 mb-8 text-center text-lg max-w-48.75 opacity-0  group-hover:opacity-100 transition-opacity duration-300">
                    {profissionale.thumbInfo.description}
                  </p>

                  {/* Ícone + - aparece no hover */}
                  <svg
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z"
                      fill="#fff"
                    />
                    <path
                      d="M22.031 14.121H15.88V7.97a.879.879 0 00-1.758 0v6.152H7.97a.879.879 0 000 1.758h6.152v6.152a.879.879 0 101.758 0V15.88h6.152a.879.879 0 100-1.758z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>

      <div className="w-full relative h-95 flex items-center">
        <div className="absolute w-full h-full -z-10 bg-terra mix-blend-multiply">
          <Image
            src={
              isValidMedia(page.subscriptionBanner.image)
                ? page.subscriptionBanner.image.url!
                : '/hero.png'
            }
            alt="Banner Image"
            fill
            priority
            className="object-left object-cover saturate-200 mix-blend-multiply"
          />
        </div>

        <Container className="flex items-end justify-between max-[769px]:flex-col max-[769px]:items-center max-[769px]:text-center max-[769px]:gap-10">
          <RichText
            data={page.subscriptionBanner.title}
            className="text-white text-5xl font-intro font-light leading-11 max-[601px]:text-3xl max-[601px]:leading-8"
          />
          <a
            href={page.subscriptionBanner.buttonLink!}
            className="text-bege text-5xl font-intro font-light leading-11 max-[601px]:text-3xl max-[601px]:leading-8"
          >
            <Button variant={'primary'}>{page.subscriptionBanner.buttonTitle}</Button>
          </a>
        </Container>
      </div>

      <div className="w-full bg-terra pt-20 max-[1025px]:pb-20">
        <Container className="flex items-center justify-between max-[769px]:flex-col">
          <div className="max-w-83.5">
            <RichText
              data={page.appSection.title}
              className="text-white font-intro font-light leading-11 text-5xl max-[769px]:text-3xl max-[769px]:leading-8"
            />
            <RichText
              data={page.appSection.text}
              className="mt-36 text-white text-lg font-intro font-light leading-6 max-[769px]:mt-14"
            />
          </div>

          <div className="relative w-145.25 h-156 translate-y-16 max-[1025px]:hidden">
            <Image
              src={isValidMedia(page.appSection.image) ? page.appSection.image.url! : '/hero.png'}
              fill
              alt=""
              className="object-contain"
            />
          </div>

          <div className="max-w-83.5 flex flex-col items-end text-end max-[769px]:text-start max-[769px]:items-start">
            <div className="flex flex-col space-y-2 items-end max-[769px]:items-start max-[769px]:mt-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={109}
                height={32}
                fill="none"
                className="_1fkir84a"
                aria-hidden="false"
              >
                <g clipPath="url(#badge-googleplay_svg__a)">
                  <path
                    fill="#673032"
                    d="M104.209 31.92H4.707a3.99 3.99 0 01-3.98-3.98V4.06A3.99 3.99 0 014.707.08h99.502a3.99 3.99 0 013.98 3.98v23.88c0 2.19-1.791 3.98-3.98 3.98"
                  />
                  <path
                    fill="#A6A6A6"
                    d="M104.209.08H4.707a3.99 3.99 0 00-3.98 3.98v23.88a3.99 3.99 0 003.98 3.98h99.502a3.99 3.99 0 003.98-3.98V4.06a3.99 3.99 0 00-3.98-3.98m0 .637c1.844 0 3.343 1.5 3.343 3.343v23.88a3.347 3.347 0 01-3.343 3.344H4.707a3.347 3.347 0 01-3.344-3.343V4.06c0-1.844 1.5-3.344 3.344-3.344z"
                  />
                  <path
                    fill="#fff"
                    d="M85.85 23.96h1.485v-9.95H85.85zm13.378-6.366l-1.702 4.314h-.051l-1.767-4.314h-1.6l2.65 6.03-1.511 3.354h1.55l4.083-9.384zm-8.423 5.236c-.487 0-1.166-.243-1.166-.845 0-.768.846-1.063 1.575-1.063.654 0 .96.141 1.357.334a1.8 1.8 0 01-1.766 1.574m.179-5.454c-1.075 0-2.19.474-2.65 1.524l1.318.55c.282-.55.806-.73 1.357-.73.769 0 1.55.461 1.562 1.28v.103a3.3 3.3 0 00-1.549-.384c-1.42 0-2.868.78-2.868 2.24 0 1.332 1.165 2.19 2.47 2.19 1 0 1.55-.448 1.896-.973h.051v.768h1.434v-3.815c0-1.767-1.318-2.753-3.021-2.753m-9.18 1.43h-2.112v-3.412h2.112c1.11 0 1.741.92 1.741 1.706 0 .77-.63 1.705-1.74 1.705m-.038-4.797h-3.559v9.951h1.485v-3.77h2.074c1.646 0 3.264-1.192 3.264-3.09 0-1.899-1.618-3.09-3.264-3.09m-19.408 8.823c-1.026 0-1.885-.86-1.885-2.04 0-1.192.86-2.064 1.885-2.064 1.013 0 1.808.872 1.808 2.065 0 1.18-.795 2.039-1.808 2.039m1.706-4.681h-.052c-.333-.398-.974-.756-1.782-.756-1.693 0-3.245 1.487-3.245 3.398 0 1.898 1.552 3.373 3.245 3.373.808 0 1.45-.36 1.782-.77h.052v.488c0 1.295-.693 1.987-1.808 1.987-.91 0-1.475-.654-1.706-1.205l-1.295.538c.372.898 1.36 2.001 3 2.001 1.745 0 3.22-1.026 3.22-3.527V17.6h-1.411zm2.436 5.81h1.488v-9.952H66.5zm3.681-3.284c-.039-1.308 1.013-1.974 1.77-1.974.59 0 1.09.294 1.256.718zm4.617-1.128c-.282-.757-1.142-2.154-2.899-2.154-1.744 0-3.193 1.372-3.193 3.385 0 1.898 1.436 3.386 3.36 3.386 1.552 0 2.45-.95 2.822-1.5l-1.155-.77c-.384.564-.91.936-1.667.936s-1.295-.346-1.642-1.026l4.527-1.872zM38.73 18.433v1.436h3.437c-.102.808-.372 1.398-.782 1.809-.5.5-1.282 1.051-2.655 1.051-2.116 0-3.77-1.705-3.77-3.821s1.654-3.822 3.77-3.822a3.66 3.66 0 012.59 1.026l1.014-1.013c-.86-.82-2-1.45-3.604-1.45-2.898 0-5.334 2.36-5.334 5.259 0 2.898 2.436 5.258 5.334 5.258 1.565 0 2.745-.513 3.668-1.475.949-.95 1.244-2.283 1.244-3.36 0-.334-.026-.641-.077-.898zm8.82 4.399c-1.027 0-1.912-.847-1.912-2.052 0-1.218.885-2.052 1.911-2.052s1.911.834 1.911 2.052c0 1.205-.885 2.052-1.91 2.052m0-5.437c-1.873 0-3.4 1.423-3.4 3.385 0 1.95 1.527 3.386 3.4 3.386s3.398-1.437 3.398-3.386c0-1.962-1.526-3.386-3.399-3.386m7.413 5.437c-1.026 0-1.91-.847-1.91-2.052 0-1.218.884-2.052 1.91-2.052s1.91.834 1.91 2.052c0 1.205-.884 2.052-1.91 2.052m0-5.437c-1.872 0-3.398 1.423-3.398 3.385 0 1.95 1.526 3.386 3.398 3.386s3.398-1.437 3.398-3.386c0-1.962-1.526-3.386-3.398-3.386"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__b)"
                    d="M9.093 25.862l-.06-.056c-.231-.245-.368-.626-.368-1.119v.116V7.194v.121c0-.534.16-.936.427-1.177l9.862 9.863zM8.668 7.063v-.002zm0-.005v-.001"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__c)"
                    d="M22.241 19.406l.075-.042 3.895-2.213c.371-.212.619-.467.742-.738-.123.27-.37.527-.742.738l-3.895 2.213zm.001-.116L18.954 16l3.288-3.288 3.969 2.255c.504.287.787.656.834 1.033v.001c-.047.377-.33.746-.834 1.032z"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__d)"
                    d="M9.796 26.122c-.275 0-.516-.09-.703-.259L18.954 16l3.288 3.289-11.554 6.565c-.32.18-.623.267-.892.267m-.706-.145l-.051-.05z"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__e)"
                    d="M18.954 16.001L9.092 6.139c.187-.17.427-.259.703-.259.27 0 .573.086.893.268l11.554 6.565zm3.362-3.362L10.688 6.032c-.32-.182-.623-.268-.893-.268H9.79h.005c.27 0 .572.086.892.267z"
                  />
                  <path
                    fill="#000"
                    d="M9.869 26.236c.25-.014.527-.1.819-.265l11.553-6.565-11.553 6.565a1.9 1.9 0 01-.82.265m-.777-.256l-.002-.003zm-.054-.053l-.005-.005z"
                  />
                  <path fill="url(#badge-googleplay_svg__f)" d="M22.241 19.406l.075-.042z" />
                  <path
                    fill="url(#badge-googleplay_svg__g)"
                    d="M9.796 26.238a1.03 1.03 0 01-.704-.259l-.002-.002-.052-.05-.005-.005.06-.059c.187.17.427.259.703.259.269 0 .572-.086.892-.267l11.554-6.565.074.074-.075.042-11.553 6.565a1.9 1.9 0 01-.82.265z"
                  />
                  <path
                    fill="#000"
                    d="M9.033 25.923c-.231-.245-.368-.626-.368-1.119 0 .493.137.873.368 1.119"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__h)"
                    d="M9.033 25.922c-.231-.245-.368-.625-.368-1.119v-.116c0 .493.137.874.368 1.119l.06.056z"
                  />
                  <path fill="url(#badge-googleplay_svg__i)" d="M9.033 25.922l.06-.06z" />
                  <path fill="#000" d="M26.953 16.413a1 1 0 00.092-.41v-.001q0 .208-.092.411" />
                  <path
                    fill="url(#badge-googleplay_svg__j)"
                    d="M22.316 19.363l-.074-.074 3.97-2.255c.503-.286.786-.656.833-1.032q0 .208-.092.41c-.123.271-.37.527-.742.738z"
                  />
                  <path
                    fill="#404040"
                    d="M27.045 16.001c0-.417-.279-.833-.834-1.149l-3.895-2.213 3.895 2.213c.556.316.835.733.834 1.149"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__k)"
                    d="M27.046 16.001c-.048-.377-.33-.746-.835-1.033l-3.969-2.255.074-.074 3.895 2.213c.556.316.834.733.835 1.149"
                  />
                  <path
                    fill="#404040"
                    d="M8.668 7.065v-.002zm0-.004v-.003zm0-.004c.047-.818.491-1.29 1.12-1.293a1.02 1.02 0 00-.696.258l-.002.002q-.03.027-.057.056c-.209.221-.34.552-.364.977"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__l)"
                    d="M8.665 7.315v-.121q0-.066.003-.129v-.008c.025-.424.156-.756.365-.977l.059.059c-.268.24-.427.643-.427 1.176m.425-1.29l.002-.003z"
                  />
                  <path
                    fill="url(#badge-googleplay_svg__m)"
                    d="M22.242 12.713L10.688 6.148c-.32-.182-.624-.268-.894-.268-.275 0-.515.09-.703.259l-.058-.059q.028-.03.057-.056l.002-.001c.186-.168.424-.258.696-.26h.006c.27 0 .573.087.893.269l11.629 6.607z"
                  />
                  <path
                    fill="#fff"
                    d="M34.246 9.842h.848q.825 0 1.31-.474.484-.474.484-1.327 0-.847-.484-1.325-.485-.476-1.31-.477h-.848zm-.613.587V5.653h1.46q1.1 0 1.762.663.66.664.66 1.725t-.66 1.724-1.761.664z"
                  />
                  <path
                    fill="#fff"
                    d="M34.246 9.841v.08h.847c.566 0 1.027-.164 1.366-.496.341-.334.508-.802.508-1.385 0-.579-.167-1.046-.508-1.38-.339-.335-.8-.501-1.366-.5h-.927v3.76h.08zh.08V6.318h.767c.536.001.949.154 1.255.455s.46.717.46 1.267c0 .555-.156.972-.46 1.27-.306.3-.718.45-1.255.452h-.847zh.08zm-.614.587h.08V5.732h1.381c.718 0 1.28.214 1.705.64.424.427.636.977.637 1.668 0 .691-.213 1.24-.637 1.668-.425.426-.987.64-1.705.64h-1.46zh.079zv.08h1.461c.75 0 1.361-.228 1.818-.687.456-.458.684-1.058.683-1.78 0-.724-.227-1.324-.683-1.781-.456-.46-1.069-.688-1.818-.688h-1.54v4.936h.08zm4.744.001V5.653h.614v4.776z"
                  />
                  <path
                    fill="#fff"
                    d="M38.376 10.428h.08V5.732h.453v4.617h-.533zh.08zv.079h.693V5.572h-.774v4.936h.08zm3.054.107q-.52 0-1.017-.34a1.57 1.57 0 01-.65-.954l.56-.227q.1.394.41.664.312.27.697.27.4 0 .684-.21a.67.67 0 00.283-.57q0-.4-.283-.617-.284-.218-.897-.404-.635-.2-.96-.517a1.08 1.08 0 01-.328-.81q0-.514.407-.894.408-.38 1.06-.38.608 0 .988.303.38.304.493.664l-.56.233a.83.83 0 00-.296-.42q-.237-.193-.61-.193a.94.94 0 00-.604.197.6.6 0 00-.25.49q0 .266.23.45.23.183.677.33.353.115.59.22.237.107.48.284.243.176.367.44.123.265.123.61 0 .347-.143.62a1.16 1.16 0 01-.38.434 1.91 1.91 0 01-1.07.327"
                  />
                  <path
                    fill="#fff"
                    d="M41.43 10.535v-.08c-.329 0-.65-.107-.972-.326a1.5 1.5 0 01-.618-.907l-.077.018.03.075.56-.227-.03-.074-.077.02q.106.418.435.703.331.288.75.29a1.2 1.2 0 00.73-.225.75.75 0 00.316-.635c.001-.285-.105-.521-.314-.68-.202-.154-.509-.29-.922-.417q-.622-.197-.929-.498a1 1 0 01-.303-.753c0-.32.124-.593.382-.835.256-.239.586-.359 1.006-.36.392 0 .7.098.937.287.245.195.398.404.468.625l.076-.023-.03-.074-.56.233.03.073.077-.02a.9.9 0 00-.323-.461 1.016 1.016 0 00-.662-.211c-.25 0-.472.07-.652.214a.68.68 0 00-.281.552.64.64 0 00.26.513q.248.195.702.343.35.113.583.218.228.102.465.275.228.165.342.41.116.244.116.576 0 .329-.134.583-.135.257-.355.405a1.8 1.8 0 01-1.026.313zv.08a2 2 0 001.115-.341q.255-.172.407-.463.153-.293.152-.657 0-.361-.13-.644a1.2 1.2 0 00-.393-.471 2.8 2.8 0 00-.494-.292 6 6 0 00-.599-.223q-.438-.146-.652-.317a.48.48 0 01-.2-.388.52.52 0 01.22-.427.87.87 0 01.554-.18q.352.001.56.175h.002-.001a.75.75 0 01.27.38l.024.087.643-.268.067-.028-.021-.07q-.125-.387-.52-.702c-.27-.215-.62-.321-1.037-.32-.45-.001-.828.133-1.115.401-.284.265-.433.588-.432.952-.001.347.118.643.351.868q.346.334.992.535h.001q.607.188.872.391c.168.131.25.306.252.554a.59.59 0 01-.251.507q-.26.194-.636.194a.96.96 0 01-.646-.25 1.2 1.2 0 01-.384-.624l-.023-.088-.645.26-.064.027.017.067c.105.425.335.764.683 1q.513.353 1.062.354zm3.088-2.628h1.028a.8.8 0 00.62-.26.84.84 0 00.234-.573.84.84 0 00-.234-.574.8.8 0 00-.62-.26h-1.028zm0 2.522h-.613V5.653h1.628q.607 0 1.05.403t.444 1.018q0 .612-.444 1.016-.443.405-1.05.404h-1.015z"
                  />
                  <path
                    fill="#fff"
                    d="M44.519 7.906v.08h1.028a.87.87 0 00.68-.286.92.92 0 00.253-.627.92.92 0 00-.254-.627.87.87 0 00-.68-.287H44.44v1.827h.08zh.08V6.318h.948c.24.002.42.078.56.235h.002-.001a.76.76 0 01.213.52.76.76 0 01-.213.52c-.141.157-.32.233-.561.234h-1.028zh.08zm0 2.522v-.08h-.534V5.733h1.549c.386 0 .714.126.996.382.28.256.417.569.418.96-.001.389-.137.7-.418.957-.282.257-.61.383-.996.383h-1.095v2.014zv-.08zh.08V8.573h.935c.421.001.795-.142 1.103-.424.312-.282.471-.648.47-1.076a1.4 1.4 0 00-.47-1.076 1.6 1.6 0 00-1.103-.425h-1.708v4.936h.773v-.08zm4.139-1.017q.53.537 1.297.537.769 0 1.297-.537.531-.536.531-1.37t-.53-1.372a1.75 1.75 0 00-1.298-.536q-.767 0-1.297.536-.53.538-.53 1.371 0 .835.53 1.371m3.048.4q-.705.724-1.75.724-1.05.001-1.751-.724-.704-.723-.704-1.77 0-1.049.704-1.771.703-.725 1.75-.725 1.041 0 1.748.728.707.727.707 1.767 0 1.048-.703 1.771"
                  />
                  <path
                    fill="#fff"
                    d="M48.657 9.41l-.056.057c.366.372.824.561 1.354.56.53.001.988-.188 1.354-.56.369-.373.554-.855.553-1.427.001-.572-.184-1.054-.553-1.427a1.83 1.83 0 00-1.354-.56 1.83 1.83 0 00-1.354.56l-.003.002.003-.002c-.369.373-.554.855-.554 1.427s.185 1.054.554 1.427zl.057-.056c-.338-.344-.507-.776-.507-1.315 0-.54.17-.971.507-1.315a1.67 1.67 0 011.24-.513c.494 0 .902.17 1.242.513.338.344.507.776.507 1.315 0 .54-.17.971-.508 1.315a1.67 1.67 0 01-1.24.513c-.493-.001-.9-.17-1.241-.513zm3.049.4l-.057-.055c-.456.468-1.014.7-1.694.7s-1.238-.232-1.694-.7l-.002-.002.002.002c-.456-.469-.68-1.035-.68-1.715s.224-1.246.68-1.716c.456-.467 1.014-.699 1.694-.7.675.001 1.232.234 1.691.704.457.471.683 1.036.684 1.712 0 .68-.226 1.246-.68 1.715zl.057.055c.483-.496.727-1.11.726-1.826 0-.712-.244-1.325-.729-1.823a2.421 2.421 0 00-1.805-.752c-.717 0-1.326.251-1.808.749-.484.495-.727 1.11-.726 1.826 0 .716.242 1.33.726 1.826.482.498 1.091.749 1.808.748.716 0 1.325-.25 1.808-.748zm1.566.619V5.653h.746l2.322 3.715h.026l-.026-.92V5.653h.614v4.776h-.64l-2.43-3.896h-.026l.027.92v2.976z"
                  />
                  <path
                    fill="#fff"
                    d="M53.271 10.428h.08V5.732h.623l2.32 3.715h.153l-.028-1.001V5.732h.455v4.617h-.517l-2.429-3.896h-.152l.029 1.001v2.895h-.534zh.08zv.079h.693V7.452l-.027-.921-.08.002v.08h.027v-.08l-.067.042 2.452 3.933h.764V5.572h-.774v2.876l.027.922.08-.002v-.08h-.027v.08l.068-.043-2.345-3.753h-.871v4.936h.08zM58.62 5.28h-.534l.348-.855h.667zm-.573 5.149V5.653h.613v4.776z"
                  />
                  <path
                    fill="#fff"
                    d="M58.621 5.279v-.08h-.416l.283-.695h.477l-.414.735zv-.08zl.07.039.546-.973h-.856l-.413 1.013h.699l.023-.04zm-.574 5.15h.08V5.731h.454v4.617h-.534zh.08zv.079h.694V5.572h-.774v4.936h.08zm2.888 0l-1.681-4.776h.68l1.308 3.875h.026l1.361-3.875h.68l-1.734 4.776z"
                  />
                  <path
                    fill="#fff"
                    d="M60.935 10.428l.075-.026-1.644-4.67h.511l1.307 3.875h.14l1.361-3.875h.51l-1.676 4.617h-.584zl.075-.027zv.08h.696l1.792-4.936h-.85l-1.38 3.93.075.026v-.08h-.026v.08l.075-.026-1.326-3.93h-.849l1.736 4.936h.056zm5.857-4.188h-2.175v1.514h1.962v.574h-1.962v1.514h2.175v.587h-2.788V5.653h2.788z"
                  />
                  <path
                    fill="#fff"
                    d="M66.793 6.239v-.08h-2.255v1.674H66.5v.414h-1.962v1.674h2.175v.428h-2.629V5.732h2.629v.507zv-.08zh.08v-.667h-2.948v4.936h2.947V9.76h-2.174V8.408h1.96v-.734h-1.96V6.319h2.174v-.08zm.96 4.19V5.653h.613v4.189h2.068v.587z"
                  />
                  <path
                    fill="#fff"
                    d="M67.753 10.428h.08V5.732h.454v4.19h2.068v.427h-2.602zh.08zv.079h2.761V9.76h-2.067V5.573h-.774v4.936h.08zm5.057.001V5.653h.746l2.321 3.715h.027l-.027-.92V5.653h.615v4.776h-.64l-2.43-3.896h-.026l.026.92v2.976z"
                  />
                  <path
                    fill="#fff"
                    d="M72.81 10.428h.079V5.732h.623l2.321 3.715h.152l-.028-1.001V5.732h.455v4.617h-.518l-2.427-3.896h-.153l.028 1.001v2.895h-.533zh.08zv.079h.693V7.452l-.027-.921-.08.002v.08h.027v-.08l-.068.042 2.452 3.933h.766V5.572h-.775v2.876l.027.922.08-.002v-.08h-.027v.08l.068-.043L73.6 5.572h-.87v4.936h.08zm5.63-1.017q.531.537 1.298.537t1.298-.537q.53-.536.53-1.37t-.53-1.372a1.75 1.75 0 00-1.298-.536q-.767 0-1.297.536-.53.538-.53 1.371 0 .835.53 1.371m3.05.4q-.705.724-1.752.724-1.047.001-1.75-.724-.704-.723-.704-1.77 0-1.049.704-1.771.703-.725 1.75-.725 1.04 0 1.748.728.707.727.707 1.767 0 1.048-.703 1.771"
                  />
                  <path
                    fill="#fff"
                    d="M78.441 9.41l-.056.057c.366.372.824.561 1.354.56.53.001.988-.188 1.354-.56.368-.373.555-.855.554-1.427 0-.572-.186-1.054-.554-1.427a1.83 1.83 0 00-1.354-.56 1.83 1.83 0 00-1.354.56c-.369.373-.554.855-.553 1.427-.001.572.184 1.054.553 1.427zl.057-.056c-.338-.344-.507-.776-.507-1.315 0-.54.17-.971.507-1.315a1.67 1.67 0 011.24-.513c.493 0 .902.17 1.241.513.34.344.508.776.509 1.315-.001.54-.17.971-.508 1.315-.34.344-.749.512-1.241.513-.493-.001-.9-.17-1.241-.513zm3.05.4l-.058-.055c-.456.468-1.014.7-1.694.7s-1.239-.232-1.694-.7c-.455-.469-.68-1.035-.68-1.715s.225-1.246.68-1.716c.455-.467 1.014-.699 1.694-.7.676.001 1.232.234 1.69.704.458.471.684 1.036.685 1.712 0 .68-.226 1.246-.681 1.715zl.057.055c.483-.496.727-1.11.726-1.826a2.52 2.52 0 00-.729-1.823 2.421 2.421 0 00-1.805-.752c-.717 0-1.326.251-1.808.749-.484.495-.727 1.11-.726 1.826 0 .716.242 1.33.726 1.826.482.498 1.091.749 1.808.748.716 0 1.325-.25 1.808-.748z"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="badge-googleplay_svg__b"
                    x1={18.08}
                    x2={4.72}
                    y1={7.013}
                    y2={20.372}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#00A0FF" />
                    <stop offset={0.007} stopColor="#00A1FF" />
                    <stop offset={0.26} stopColor="#00BEFF" />
                    <stop offset={0.512} stopColor="#00D2FF" />
                    <stop offset={0.76} stopColor="#00DFFF" />
                    <stop offset={1} stopColor="#00E3FF" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__c"
                    x1={27.659}
                    x2={8.398}
                    y1={16.002}
                    y2={16.002}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFE000" />
                    <stop offset={0.409} stopColor="#FFBD00" />
                    <stop offset={0.775} stopColor="orange" />
                    <stop offset={1} stopColor="#FF9C00" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__d"
                    x1={20.489}
                    x2={2.373}
                    y1={17.828}
                    y2={35.944}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF3A44" />
                    <stop offset={1} stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__e"
                    x1={6.536}
                    x2={14.625}
                    y1={0.22}
                    y2={8.31}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#32A071" />
                    <stop offset={0.069} stopColor="#2DA771" />
                    <stop offset={0.476} stopColor="#15CF74" />
                    <stop offset={0.801} stopColor="#06E775" />
                    <stop offset={1} stopColor="#00F076" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__f"
                    x1={27.66}
                    x2={8.398}
                    y1={16.002}
                    y2={16.002}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CCB300" />
                    <stop offset={0.409} stopColor="#CC9700" />
                    <stop offset={0.775} stopColor="#CC8400" />
                    <stop offset={1} stopColor="#CC7D00" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__g"
                    x1={20.489}
                    x2={2.373}
                    y1={17.828}
                    y2={35.944}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CC2E36" />
                    <stop offset={1} stopColor="#9C0E4E" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__h"
                    x1={18.08}
                    x2={4.72}
                    y1={7.013}
                    y2={20.372}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#008DE0" />
                    <stop offset={0.007} stopColor="#008DE0" />
                    <stop offset={0.26} stopColor="#00A7E0" />
                    <stop offset={0.512} stopColor="#00B8E0" />
                    <stop offset={0.76} stopColor="#00C4E0" />
                    <stop offset={1} stopColor="#00C7E0" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__i"
                    x1={20.489}
                    x2={2.374}
                    y1={17.828}
                    y2={35.945}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E0333C" />
                    <stop offset={1} stopColor="#AB0F56" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__j"
                    x1={27.66}
                    x2={8.398}
                    y1={16.001}
                    y2={16.001}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E0C500" />
                    <stop offset={0.409} stopColor="#E0A600" />
                    <stop offset={0.775} stopColor="#E09100" />
                    <stop offset={1} stopColor="#E08900" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__k"
                    x1={27.66}
                    x2={8.399}
                    y1={16.002}
                    y2={16.002}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFE840" />
                    <stop offset={0.409} stopColor="#FFCE40" />
                    <stop offset={0.775} stopColor="#FFBC40" />
                    <stop offset={1} stopColor="#FFB540" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__l"
                    x1={18.08}
                    x2={4.72}
                    y1={7.013}
                    y2={20.372}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#40B8FF" />
                    <stop offset={0.007} stopColor="#40B9FF" />
                    <stop offset={0.26} stopColor="#40CEFF" />
                    <stop offset={0.512} stopColor="#40DDFF" />
                    <stop offset={0.76} stopColor="#40E7FF" />
                    <stop offset={1} stopColor="#40EAFF" />
                  </linearGradient>
                  <linearGradient
                    id="badge-googleplay_svg__m"
                    x1={6.535}
                    x2={14.625}
                    y1={0.22}
                    y2={8.31}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#65B895" />
                    <stop offset={0.069} stopColor="#62BD95" />
                    <stop offset={0.476} stopColor="#50DB97" />
                    <stop offset={0.801} stopColor="#44ED98" />
                    <stop offset={1} stopColor="#40F498" />
                  </linearGradient>
                  <clipPath id="badge-googleplay_svg__a">
                    <path fill="#fff" d="M.567 0h107.701v32H.568z" />
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={96}
                height={32}
                fill="none"
                className="_1fkir84a"
                aria-hidden="false"
              >
                <g clipPath="url(#badge-appstore_svg__a)">
                  <path
                    fill="#FFFFFF"
                    d="M88.376 0H7.896q-.438 0-.875.002-.366.003-.736.01-.807.009-1.603.141a5.326 5.326 0 00-1.52.502A5.15 5.15 0 00.424 4.417Q.29 5.213.281 6.02c-.008.245-.009.491-.012.737v18.491c.003.248.004.489.012.738q.01.806.143 1.601a5.3 5.3 0 00.5 1.524c.242.478.56.914.943 1.29.378.383.815.7 1.295.944.478.243.99.413 1.52.505q.796.13 1.603.14c.248.006.49.01.736.01l.875.001h80.48l.868-.002c.243 0 .493-.003.737-.008a10.6 10.6 0 001.6-.141 5.5 5.5 0 001.527-.505A5 5 0 0094.4 30.4c.381-.378.7-.814.946-1.291.241-.48.408-.994.495-1.524q.135-.796.148-1.601c.004-.249.004-.49.004-.738q.008-.434.006-.875V7.629q.001-.44-.006-.873.001-.37-.004-.737-.015-.806-.148-1.602a5.3 5.3 0 00-.495-1.522 5.17 5.17 0 00-2.24-2.24A5.4 5.4 0 0091.58.153a10.4 10.4 0 00-1.6-.141c-.244-.004-.494-.009-.737-.01Q88.81 0 88.376 0"
                  />
                  <path
                    fill="#673032"
                    d="M7.024 31.3c-.243 0-.481-.003-.723-.008q-.753-.01-1.495-.13a4.7 4.7 0 01-1.326-.44 4.3 4.3 0 01-1.117-.812 4.3 4.3 0 01-.817-1.118 4.6 4.6 0 01-.434-1.325 10 10 0 01-.133-1.5c-.006-.17-.012-.73-.012-.73V6.755s.007-.553.012-.716q.009-.753.132-1.498c.076-.462.223-.91.435-1.33A4.452 4.452 0 014.803.842Q5.547.72 6.302.71L7.025.7H89.24l.73.01q.748.01 1.487.13a4.8 4.8 0 011.336.439 4.47 4.47 0 011.932 1.936c.209.415.353.86.429 1.319q.125.75.139 1.51c.002.226.002.47.002.712.006.3.006.585.006.873v16.743q.002.433-.006.86c0 .26 0 .499-.003.744q-.015.746-.137 1.483a4.6 4.6 0 01-.432 1.336c-.21.41-.485.784-.812 1.108a4.3 4.3 0 01-1.12.818 4.7 4.7 0 01-1.334.44q-.744.12-1.496.13c-.234.006-.48.01-.718.01H7.024"
                  />
                  <path
                    fill="#fff"
                    d="M20.084 16.24a3.96 3.96 0 011.885-3.32 4.05 4.05 0 00-3.193-1.727c-1.343-.141-2.645.804-3.33.804-.698 0-1.752-.79-2.887-.767a4.25 4.25 0 00-3.578 2.183c-1.547 2.678-.393 6.615 1.089 8.78.741 1.06 1.608 2.245 2.742 2.203 1.11-.046 1.524-.707 2.863-.707 1.327 0 1.716.707 2.873.68 1.19-.019 1.941-1.064 2.657-2.135a8.8 8.8 0 001.214-2.474 3.83 3.83 0 01-2.335-3.52m-2.185-6.47c.65-.78.97-1.782.892-2.793a3.97 3.97 0 00-2.566 1.327 3.7 3.7 0 00-.915 2.69 3.28 3.28 0 002.589-1.225M34.11 21.712h-3.786l-.91 2.685H27.81l3.587-9.934h1.667l3.586 9.934h-1.63zm-3.394-1.239h3.002l-1.48-4.358h-.041zm13.681.303c0 2.25-1.205 3.697-3.023 3.697a2.46 2.46 0 01-2.279-1.267h-.034v3.587h-1.487v-9.639h1.44v1.205h.027a2.57 2.57 0 012.306-1.28c1.838 0 3.05 1.453 3.05 3.697m-1.528 0c0-1.466-.758-2.43-1.914-2.43-1.136 0-1.9.984-1.9 2.43 0 1.46.764 2.437 1.9 2.437 1.156 0 1.914-.957 1.914-2.437m9.5 0c0 2.25-1.205 3.697-3.023 3.697a2.46 2.46 0 01-2.279-1.267h-.034v3.587h-1.487v-9.639h1.439v1.205h.027a2.57 2.57 0 012.307-1.28c1.838 0 3.05 1.453 3.05 3.697m-1.529 0c0-1.466-.757-2.43-1.914-2.43-1.136 0-1.9.984-1.9 2.43 0 1.46.764 2.437 1.9 2.437 1.157 0 1.914-.957 1.914-2.437m6.797.853c.11.985 1.067 1.632 2.375 1.632 1.253 0 2.155-.647 2.155-1.535 0-.771-.544-1.233-1.831-1.55l-1.288-.31c-1.824-.44-2.671-1.293-2.671-2.678 0-1.714 1.494-2.891 3.615-2.891 2.099 0 3.538 1.177 3.587 2.891h-1.501c-.09-.991-.91-1.59-2.107-1.59s-2.017.606-2.017 1.487c0 .703.523 1.116 1.803 1.432l1.095.269c2.038.482 2.885 1.3 2.885 2.754 0 1.858-1.48 3.023-3.835 3.023-2.203 0-3.69-1.137-3.787-2.934zm9.308-6.189v1.714h1.378v1.177h-1.378v3.993c0 .62.276.91.882.91q.244-.005.489-.035v1.17q-.41.076-.826.069c-1.467 0-2.038-.55-2.038-1.956v-4.151h-1.054v-1.177h1.053V15.44zm2.176 5.335c0-2.278 1.342-3.71 3.435-3.71 2.1 0 3.436 1.431 3.436 3.71 0 2.286-1.329 3.711-3.436 3.711-2.106 0-3.435-1.425-3.435-3.71m5.356 0c0-1.563-.716-2.485-1.92-2.485-1.205 0-1.921.93-1.921 2.485 0 1.57.716 2.486 1.92 2.486 1.205 0 1.921-.916 1.921-2.486m2.741-3.622h1.418v1.233h.034a1.73 1.73 0 011.742-1.309q.258 0 .51.056v1.39a2.1 2.1 0 00-.668-.09 1.498 1.498 0 00-1.55 1.667v4.296h-1.486zm10.558 5.116c-.2 1.314-1.48 2.216-3.119 2.216-2.107 0-3.415-1.411-3.415-3.676 0-2.272 1.315-3.745 3.352-3.745 2.004 0 3.265 1.376 3.265 3.572v.51h-5.116v.09a1.886 1.886 0 001.948 2.05 1.64 1.64 0 001.673-1.018zm-5.026-2.163h3.621a1.743 1.743 0 00-1.776-1.838 1.834 1.834 0 00-1.845 1.838m-53.944-8.349V6.984h1.918c.897 0 1.436.457 1.436 1.191a1.046 1.046 0 01-.836 1.026v.056a1.13 1.13 0 011.075 1.148c0 .84-.612 1.353-1.632 1.353zm.741-2.753h.88c.655 0 .996-.241.996-.694 0-.44-.321-.698-.87-.698h-1.006zm1.072 2.124c.668 0 1.022-.271 1.022-.777 0-.5-.367-.761-1.065-.761h-1.029v1.538zm2.541-.389c0-.65.483-1.023 1.34-1.076l.976-.057v-.31c0-.381-.252-.596-.738-.596-.397 0-.672.146-.75.4h-.689c.073-.618.655-1.015 1.472-1.015.903 0 1.413.45 1.413 1.21v2.462h-.685v-.506h-.056a1.21 1.21 0 01-1.082.565 1.09 1.09 0 01-1.2-1.078m2.316-.309v-.3l-.88.055c-.496.034-.721.202-.721.52 0 .324.281.513.668.513a.85.85 0 00.933-.788m1.727-3.34a.462.462 0 01.775-.362.46.46 0 01-.315.796.44.44 0 01-.46-.434m.105 1.066h.709v3.602h-.709zm3.149 2.324l-.788 1.278h-.78l1.195-1.793-1.205-1.81h.83l.775 1.27h.056l.767-1.27h.79l-1.187 1.78 1.2 1.823h-.816l-.784-1.277zm2.282.26c0-.65.482-1.023 1.34-1.076l.975-.057v-.31c0-.381-.252-.596-.738-.596-.397 0-.672.146-.75.4h-.689c.073-.618.655-1.015 1.472-1.015.903 0 1.413.45 1.413 1.21v2.462h-.685v-.506h-.056a1.21 1.21 0 01-1.082.565 1.09 1.09 0 01-1.2-1.078m2.315-.309v-.3l-.88.055c-.496.034-.72.202-.72.52 0 .324.28.513.667.513a.85.85 0 00.933-.788m1.821-2.274h.684v.552h.053a.98.98 0 01.973-.612q.16-.002.317.03v.701a2 2 0 00-.396-.043.844.844 0 00-.92.847v2.127h-.711zm4.768 0h.684v.572h.053a1.08 1.08 0 011.075-.641 1.17 1.17 0 011.247 1.34v2.331h-.71V9.605c0-.579-.252-.867-.778-.867a.827.827 0 00-.86.913v2.107h-.711zm3.954 2.584c0-.65.483-1.023 1.34-1.076l.975-.057v-.31c0-.381-.251-.596-.737-.596-.397 0-.672.146-.751.4h-.688c.072-.618.654-1.015 1.472-1.015.903 0 1.412.45 1.412 1.21v2.462h-.684v-.506h-.056a1.21 1.21 0 01-1.083.565 1.09 1.09 0 01-1.2-1.078m2.315-.309v-.3l-.88.055c-.495.034-.72.202-.72.52 0 .324.28.513.667.513a.85.85 0 00.933-.788"
                  />
                </g>
                <defs>
                  <clipPath id="badge-appstore_svg__a">
                    <path fill="#fff" d="M.269 0h95.73v32H.27z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <RichText
              data={page.appSection.textSecondary}
              className="mt-36 text-white text-lg font-intro font-light leading-6 [&_strong]:text-bege max-[769px]:mt-14"
            />
          </div>
        </Container>
      </div>

      <Footer data={settings} />
    </>
  )
}
