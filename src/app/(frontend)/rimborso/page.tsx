import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import { isValidMedia } from '@/lib/media'
import { Button } from '@/components/ui/button'
import { Faq } from '@/components/faq'
import { Footer } from '@/components/footer'
import { generateSeoMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'rimborso',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Rimborso - Don Manera',
    fallbackDescription: 'Programa de pontos e recompensas Don Manera',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const page = await payload.findGlobal({
    slug: 'rimborso',
    depth: 10,
  })

  return (
    <div className="w-full bg-terra">
      <Navbar settings={settings} />
      <Container className="pt-49.25 max-[600px]:pt-30 pb-28">
        <div className="relative w-full h-90">
          <Image
            src={isValidMedia(page.imageHero) ? page.imageHero.url! : '/default-image.png'}
            fill
            priority
            quality={100}
            alt=""
            className="object-cover rounded-[30px]"
          />

          <Image
            src={
              isValidMedia(page.thumbInfo.logo) ? page.thumbInfo.logo.url! : '/default-image.png'
            }
            width={317}
            height={64}
            priority
            quality={100}
            alt=""
            className="object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="w-full max-w-277.75 mx-auto flex gap-20 mt-32 max-[1024px]:flex-col max-[1024px]:gap-10">
          <div className="max-w-133 max-[1024px]:max-w-full">
            <RichText
              data={page.sectionAbout.description1}
              className="font-intro text-lg text-white leading-6 [&_strong]:font-bold"
            />
          </div>
          <div>
            <span className="text-white font-intro text-lg leading-6 font-bold">
              Resgate de pontos
            </span>
            <ul className="space-y-5 mt-8">
              {page.sectionAbout.benefits?.map((benefit, index) => (
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
                    {benefit.title}
                  </span>
                </li>
              ))}
            </ul>
            <a href={page.sectionAbout.buttonLink} className="text-white font-bold">
              <Button variant={'primary'} className="mt-28">
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
                {page.sectionAbout.buttonText}
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full mt-32">
          <div className="w-full max-w-277.75 mx-auto flex items-end gap-96 max-[1024px]:justify-between max-[1024px]:gap-0 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-10">
            <span className="text-white font-intro text-5xl leading-11 font-normal max-[769px]:text-3xl max-[769px]:leading-8">
              Pontos <br /> e trocas
            </span>
            <RichText
              className="text-lg text-white font-intro leading-6 max-w-89.25"
              data={page.pointsAndChanges.description}
            />
          </div>

          <div className="pl-24 mt-10 flex gap-11 max-[1366px]:pl-0">
            <div className="relative w-lg h-89.5 max-[1280px]:hidden">
              <Image
                src={
                  isValidMedia(page.pointsAndChanges.image)
                    ? page.pointsAndChanges.image.url!
                    : '/default-image.png'
                }
                fill
                alt=""
                className="rounded-[30px] object-cover "
              />
            </div>

            <div className="w-full max-w-156.25 grid grid-cols-3 gap-5 max-[1280px]:grid-cols-6 max-[1280px]:max-w-full max-[1000px]:grid-cols-4 max-[768px]:grid-cols-2 max-[376px]:grid-cols-1">
              {page.pointsAndChanges.items?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 h-26.5 rounded-[10px] border-[0.5px] border-bege flex flex-col justify-between"
                >
                  <RichText
                    className="text-bege font-intro text-sm leading-4 max-w-full [&_strong]:text-lg [&_strong]:font-bold"
                    data={item.description}
                  />
                  <span className="text-bege font-intro max-w-full text-lg font-bold leading-6 ">
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pl-24 mt-32 grid grid-cols-2 max-[1366px]:pl-0 max-[1024px]:gap-10 max-[768px]:grid-cols-1">
            <RichText
              data={page.pointsAndChanges.text1}
              className="max-w-133 font-intro text-white text-lg leading-6"
            />
            <RichText
              data={page.pointsAndChanges.text2}
              className="max-w-133 font-intro text-white text-lg leading-6"
            />
          </div>
        </div>

        <div className="w-full mt-36">
          <div className="w-full pl-24 flex items-end justify-between gap-96 max-[1024px]:justify-between max-[1024px]:gap-0 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-10 max-[1366px]:pl-0">
            <span className="text-white font-intro text-5xl leading-11 font-light max-[769px]:text-3xl max-[769px]:leading-8">
              Saiba <strong>como</strong> <br /> <strong>funciona</strong>
            </span>
            <a href={page.howItWorks.buttonLink} className="text-white font-bold">
              <Button variant={'primary'} className="mt-28 max-[768px]:mt-0">
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
                {page.howItWorks.buttonText}
              </Button>
            </a>
          </div>

          <div className="w-full mt-32 relative">
            <div className="grid grid-cols-4 w-full max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
              <div className="w-full absolute top-8 left-0 h-0.5 bg-bege max-[1024px]:hidden" />

              {page.howItWorks.items?.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col w-full max-[1024px]:text-center ${index === 0 ? 'items-start text-left -translate-x-2 max-[1024px]:translate-x-0 max-[1024px]:items-center' : index === 3 ? 'items-end text-right translate-x-2 max-[1024px]:translate-x-0 max-[1024px]:items-center!' : 'items-center max-[1024px]:text-center'}`}
                >
                  <div className="relative z-10 w-16.75 h-16.75 rounded-full bg-bege border-2 border-bege flex items-center justify-center">
                    <span className="text-terra font-intro font-normal text-4xl translate-y-0.5">
                      {`0${index + 1}`}
                    </span>
                  </div>
                  <RichText
                    className="mt-8 text-white font-intro text-lg leading-6 max-w-58.5 max-[600px]:text-base"
                    data={step.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Faq description={page.faq.description} questions={page.faq.questions} />
      </Container>

      <Footer data={settings} />
    </div>
  )
}
