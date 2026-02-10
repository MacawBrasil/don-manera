import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { Button } from '@/components/ui/button'
import { RichText } from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Footer } from '@/components/footer'
import { generateSeoMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'Profissionale',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Profissionale - Don Manera',
    fallbackDescription: 'Cursos profissionais Don Manera',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findGlobal({
    slug: 'Profissionale',
    depth: 10,
  })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const firstModule = page.modulesSection.modules[0]

  return (
    <>
      <div className="bg-[#1C293B] w-full pb-28">
        <Navbar settings={settings} />

        <Container className="h-127.5 pt-49.25 max-[600px]:pt-30 flex justify-between max-[1025px]:grid max-[1025px]:grid-cols-2 max-[601px]:gap-10 max-[1025px]:h-fit max-[1025px]:pb-20 max-[601px]:grid-cols-1">
          <div className="relative w-170 h-90 max-[1200px]:w-140 max-[1025px]:w-full max-[600px]:h-40">
            <Image
              src={isValidMedia(page.imageHero) ? page.imageHero.url! : '/default-image.png'}
              fill
              alt=""
              priority
              quality={100}
              className="object-cover rounded-[30px]"
            />

            <div className="absolute -right-35 -top-16 w-77.75 h-127.5 z-10 max-[1025px]:hidden">
              <Image
                src={isValidMedia(page.image2) ? page.image2.url! : '/default-image.png'}
                fill
                alt=""
                className="object-contain z-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-14 items-center translate-y-12 max-[1025px]:translate-y-0">
            <Image
              src={isValidMedia(page.thumbInfo.logo) ? page.thumbInfo.logo.url! : '/logo.png'}
              width={290}
              height={112}
              alt=""
            />

            <a
              href={`https://wa.me/${settings.whatsapp}?text=Gostaria de saber mais sobre Manera Professionale.`}
              target="_blank"
              rel="noopener noreferrer"
            >
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
          </div>
        </Container>

        <Container className="pl-20! grid grid-cols-2 gap-28 mt-40 max-[769px]:mt-0 max-[769px]:pl-8! max-[601px]:grid-cols-1 max-[601px]:gap-10">
          <RichText
            data={page.about.title}
            className="text-white font-intro text-5xl font-normal leading-11 [&_strong]:font-bold max-[769px]:text-3xl  max-[769px]:leading-8"
          />
          <div>
            <RichText
              data={page.about.description}
              className="text-white font-intro text-lg leading-6 max-[769px]:text-base max-[769px]:leading-5"
            />
            <div className="mt-10">
              <span className=" text-white font-intro text-lg leading-6 max-[601px]:text-base">
                Oferecemos cursos em 3 módulos:
              </span>
              <div className="mt-10 space-y-5">
                {page.about.modules.map((module, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.005 1.757c6.764 0 12.25 5.486 12.25 12.25s-5.486 12.25-12.25 12.25-12.25-5.486-12.25-12.25 5.486-12.25 12.25-12.25zm-2.544 16.229l-2.999-3.002a1.315 1.315 0 010-1.856 1.318 1.318 0 011.856 0l2.114 2.116 5.26-5.26a1.315 1.315 0 011.856 0c.511.511.51 1.346 0 1.857l-6.19 6.189a1.316 1.316 0 01-1.897-.044z"
                        fill="#D9CCB2"
                      />
                    </svg>
                    <RichText
                      key={index}
                      data={module.title}
                      className="text-bege font-intro text-lg leading-6 [&_strong]:font-bold max-[601px]:text-base"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <Container className="mt-28 pl-20! max-[769px]:pl-8!">
          <div className="w-full grid grid-cols-2 gap-28 max-[769px]:gap-10 max-[601px]:grid-cols-1 max-[601px]:gap-10">
            <RichText
              data={page.educatorsSection.title}
              className="text-white font-intro text-5xl leading-11 [&_strong]:font-bold max-[769px]:text-3xl  max-[769px]:leading-8"
            />

            <p className="text-white max-w-89.25 font-intro text-lg leading-6 max-[769px]:text-base max-[769px]:leading-5">
              {page.educatorsSection.description}
            </p>
          </div>

          <div className="w-full grid grid-cols-3 gap-10 mt-20 max-[1025px]:grid-cols-2 max-[769px]:grid-cols-1">
            {page.educatorsSection.educators.map((educator, index) => (
              <div
                key={index}
                className="w-full rounded-[40px] border-2 border-bege p-6 max-[601px]:p-3 max-[601px]:pb-10"
              >
                <div className="relative w-full h-80.5">
                  <Image
                    src={isValidMedia(educator.image) ? educator.image.url! : '/default-image.png'}
                    alt={educator.name}
                    fill
                    className="rounded-[31px] object-cover"
                  />
                </div>
                <div className="w-full flex flex-col gap-6 mt-2.5">
                  <span className="text-bege font-bold text-2xl font-intro">{educator.name}</span>
                  <p className="text-white font-intro text-lg leading-6">{educator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>

        <Container className="mt-28">
          <Accordion
            type="single"
            collapsible
            defaultValue={firstModule.id!}
            className="max-w-full"
          >
            {page.modulesSection.modules.map((module, index) => (
              <AccordionItem
                key={index}
                value={module.id!}
                className="border-b-0 relative before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-linear-30 before:from-black before:to-[#7B7B7B] before:to-30% before:rounded-full"
              >
                <AccordionTrigger className="grid grid-cols-2 min-h-44.25 items-center max-[850px]:h-fit">
                  <div className="flex items-center gap-16 max-[850px]:col-span-2 max-[500px]:gap-4 max-[500px]:flex-col max-[500px]:items-start">
                    <div className="flex flex-col gap-7">
                      <RichText
                        data={module.type}
                        className="text-white font-intro text-xl font-light leading-6"
                      />
                      <div
                        className="h-px w-32.25"
                        style={{
                          background: `linear-gradient(30deg, ${module.color}, #1C293B)`,
                        }}
                      />
                    </div>
                    <div className="flex items-end gap-5 max-[425px]:flex-col max-[425px]:items-start">
                      <RichText
                        data={module.title}
                        style={{ color: module.color }}
                        className="font-intro text-5xl max-[1280px]:text-4xl max-[768px]:text-3xl max-[500px]:text-2xl"
                      />

                      <div
                        className="w-7.5 h-7.5 flex items-center justify-center rounded-[6px] -translate-y-2"
                        style={{ backgroundColor: module.color }}
                      >
                        <Image
                          src={isValidMedia(module.icon) ? module.icon.url! : '/default-icon.png'}
                          width={isValidMedia(module.icon) ? module.icon.width! : 0}
                          height={isValidMedia(module.icon) ? module.icon.height! : 0}
                          alt="Icone"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="max-w-129.25 text-white text-lg leading-6 font-intro max-[1280px]:max-w-112.5 max-[1060px]:max-w-83 max-[850px]:max-w-full max-[850px]:col-span-2">
                    {module.description}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-5 max-[850px]:grid-cols-1">
                    <div className="relative w-full h-90.75">
                      <Image
                        src={isValidMedia(module.image) ? module.image.url! : '/default-image.png'}
                        fill
                        alt=""
                        className="object-cover rounded-[30px]"
                      />
                    </div>
                    <div className="w-full">
                      <RichText
                        data={module.description2}
                        className="max-w-129.25 text-white text-lg leading-6 font-intro max-[850px]:max-w-full"
                      />
                      <a href={module.link} target="_blank" rel="noopener noreferrer">
                        <Button variant={'primary'} className="mt-10">
                          Saiba mais
                        </Button>
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>

        <div className="relative h-68 w-11/12 mx-auto max-w-340 mt-28">
          <Image
            src={isValidMedia(page.banner.image) ? page.banner.image.url! : '/default-image.png'}
            fill
            alt=""
            className="object-cover rounded-[45px]"
          />
          <div className="absolute top-1/2 -translate-1/2 left-1/2 z-10 w-full flex items-center justify-around max-[768px]:flex-col max-[768px]:gap-5 max-[768px]:p-4 max-[768px]:items-start">
            <p className="font-intro text-5xl font-bold text-white leading-12 max-[769px]:text-3xl max-[769px]:leading-8 max-w-100">
              {page.banner.title}
            </p>

            <a href={page.banner.buttonLink} target="_blank" rel="noopener noreferrer">
              <Button variant={'primary'}>
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
                {page.banner.buttonText}
              </Button>
            </a>
          </div>
        </div>
      </div>
      <Footer data={settings} />
    </>
  )
}
