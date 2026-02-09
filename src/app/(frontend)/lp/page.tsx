import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { PlansSection } from '@/components/plans-section'
import { Container } from '@/components/container'
import { BrandSection } from '@/components/brand-section'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { generateSeoMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'landing-page',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Landing Page - Don Manera',
    fallbackDescription: 'Don Manera',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const page = await payload.findGlobal({
    slug: 'landing-page',
    depth: 10,
  })

  const home = await payload.findGlobal({
    slug: 'home',
    depth: 10,
  })

  const sobre = await payload.findGlobal({
    slug: 'sobre',
    depth: 10,
  })

  const { sectionPlans } = await payload.findGlobal({
    slug: 'comunita',
    depth: 10,
  })

  return (
    <>
      <div className="w-full max-w-480 relative h-165 max-[768px]:h-auto max-[768px]:min-h-120 max-[768px]:py-20 flex items-center justify-center flex-col gap-12 max-[768px]:gap-8">
        <Image
          src={
            isValidMedia(page.hero.background) ? page.hero.background.url! : '/default-image.png'
          }
          fill
          alt=""
          quality={100}
          priority
          className="object-cover -z-10"
        />

        <div className="flex items-center gap-16 max-[1024px]:gap-10 max-[768px]:gap-6 max-[640px]:flex-col max-[640px]:gap-4 px-4">
          <Image
            src={isValidMedia(page.hero.logo1) ? page.hero.logo1.url! : '/default-image.png'}
            width={365}
            height={238}
            alt=""
            priority
            quality={100}
            className="object-contain max-[1024px]:w-72 max-[768px]:w-56 max-[640px]:w-48"
          />
          <div className="bg-white/50 h-12 w-0.5 max-[640px]:h-0.5 max-[640px]:w-24" />
          <Image
            src={isValidMedia(page.hero.logo2) ? page.hero.logo2.url! : '/default-image.png'}
            width={386}
            priority
            height={169}
            alt=""
            quality={100}
            className="object-contain max-[1024px]:w-72 max-[768px]:w-56 max-[640px]:w-48"
          />
        </div>

        <span className="font-intro text-white text-5xl font-bold max-w-200 leading-16 text-center max-[768px]:text-3xl max-[768px]:leading-10 max-[640px]:text-2xl max-[640px]:leading-8 px-4">
          {page.hero.title}
        </span>
      </div>

      <div className="bg-terra w-full pb-65 max-[600px]:pb-20">
        <Container>
          <PlansSection description={sectionPlans.description} plans={sectionPlans.plans} />
        </Container>
      </div>

      <BrandSection
        bannerGroup={home.bannerGroup}
        brandSection={home.brandSection}
        statsData={sobre}
        absolute
      />

      <div className="bg-terra w-full pb-33.25 max-[600px]:pb-20">
        <div className="-translate-y-14 flex items-end gap-16 min-h-170.5 -translate-x-14 max-[1280px]:items-center max-[1280px]:translate-x-0 max-[1280px]:flex-col max-[1280px]:px-8 max-[1024px]:px-6 max-[768px]:px-4">
          <div className="flex flex-col items-end gap-11 max-[1280px]:items-center max-[1280px]:w-full">
            <div className="relative w-228.25 h-91 max-[1367px]:w-185 max-[768px]:w-full">
              <Image
                src={
                  isValidMedia(page.benefitsSection.image)
                    ? page.benefitsSection.image.url!
                    : '/default-image.png'
                }
                fill
                alt=""
                className="rounded-[30px] object-cover"
              />
            </div>

            <RichText
              data={page.benefitsSection.description}
              className="text-white text-lg font-normal leading-6 font-intro [&_strong]:font-bold max-w-133"
            />
          </div>

          <ul className="space-y-5 mt-8 max-[600px]:mt-0">
            {page.benefitsSection.benefits?.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 28 28"
                  fill="none"
                  className="shrink-0 mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.005 1.757c6.764 0 12.25 5.486 12.25 12.25s-5.486 12.25-12.25 12.25-12.25-5.486-12.25-12.25 5.486-12.25 12.25-12.25zm-2.544 16.229l-2.999-3.002a1.315 1.315 0 010-1.856 1.318 1.318 0 011.856 0l2.114 2.116 5.26-5.26a1.315 1.315 0 011.856 0c.511.511.51 1.346 0 1.857l-6.19 6.189a1.316 1.316 0 01-1.897-.044z"
                    fill="#fff"
                  />
                </svg>
                <span className="text-white font-intro text-lg leading-6 font-normal">
                  {benefit.benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full inset-0 max-w-480 relative bg-terra h-197">
        <Image
          src={
            isValidMedia(page.bannerFooter.backgroundImage)
              ? page.bannerFooter.backgroundImage.url!
              : '/default-image.png'
          }
          fill
          className="object-top object-cover saturate-200 mix-blend-multiply"
          alt=""
        />

        <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-44 items-center justify-center max-[768px]:gap-20">
          <div className="w-full max-w-233.5 flex justify-between max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center max-[768px]:gap-10">
            <RichText
              data={page.bannerFooter.title}
              className="text-white font-intro text-5xl font-light [&_strong]:font-bold max-[768px]:text-4xl"
            />
            <div className="flex flex-col gap-7">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank">
                <Button
                  variant={'primary'}
                  className="max-[601px]:text-base max-[601px]:min-w-fit max-[601px]:p-4 max-[321px]:text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    className="transition-all group-hover:[&_path]:fill-bege"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.984 14.286a11.833 11.833 0 01-1.654 5.655 11.954 11.954 0 01-4.185 4.176 12.087 12.087 0 01-11.496.444l-6.047 1.427a.471.471 0 01-.565-.36.451.451 0 01.001-.186l1.274-6.13A11.823 11.823 0 013.14 8.836a11.917 11.917 0 013.355-4.223 12.042 12.042 0 014.888-2.328 12.097 12.097 0 015.42.044 12.039 12.039 0 014.85 2.405 11.913 11.913 0 013.286 4.276 11.817 11.817 0 011.054 5.275h-.01zM20.63 7.328l.048.047a9.283 9.283 0 012.705 6.567 9.284 9.284 0 01-2.737 6.553A9.427 9.427 0 0115.52 23.1a9.469 9.469 0 01-5.696-.85l-.847-.416-3.714.874v-.047l.773-3.719-.414-.808a9.247 9.247 0 01-.745-6.393 9.313 9.313 0 013.61-5.347 9.45 9.45 0 0112.143.934z"
                      fill="#673032"
                      className="transition-all"
                    />
                    <path
                      d="M20.302 17.793c-.455.71-1.177 1.579-2.078 1.796-1.591.382-4.014 0-7.047-2.78l-.038-.036c-2.64-2.443-3.34-4.48-3.183-6.092.092-.916.862-1.743 1.511-2.286a.865.865 0 011.353.316l.977 2.21a.846.846 0 01-.105.87l-.496.632a.832.832 0 00-.067.931 9.183 9.183 0 001.678 1.847 9.734 9.734 0 002.323 1.651.847.847 0 00.92-.192l.57-.572a.867.867 0 01.875-.265l2.324.663a.871.871 0 01.569.523.856.856 0 01-.08.765l-.006.019z"
                      fill="#673032"
                      className="transition-all"
                    />
                  </svg>
                  Fale com a gente
                </Button>
              </a>
              <a href={page.bannerFooter.buttonLink!} target="_blank">
                <Button
                  variant={'primary'}
                  className="max-[601px]:text-base max-[601px]:min-w-fit max-[601px]:p-4 max-[321px]:text-sm"
                >
                  {page.bannerFooter.buttonTitle}
                </Button>
              </a>
            </div>
          </div>
          <Image
            src={isValidMedia(page.hero.logo1) ? page.hero.logo1.url! : '/default-image.png'}
            width={297}
            height={195}
            alt=""
            quality={100}
            className="object-contain max-[1024px]:w-72 max-[768px]:w-56 max-[640px]:w-48"
          />
        </Container>
      </div>
    </>
  )
}
