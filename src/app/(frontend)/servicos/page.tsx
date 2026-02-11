import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { RichText } from '@/components/RichText'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { generateSeoMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({
    slug: 'servicePage',
    depth: 1,
    select: { seo: true },
  })
  return generateSeoMetadata(page, {
    fallbackTitle: 'Serviços - Don Manera',
    fallbackDescription: 'Conheça os serviços da Don Manera',
  })
}

export default async function ServicosPage() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const page = await payload.findGlobal({
    slug: 'servicePage',
    depth: 10,
  })

  return (
    <>
      <div className="w-full bg-terra pb-52.5">
        <Navbar settings={settings} />

        <Container className="pt-49.25 max-[600px]:pt-30">
          <div className="w-full flex justify-between max-[1280px]:flex-col max-[1280px]:gap-10">
            <RichText
              data={page.title}
              className="text-bege text-6xl font-intro [&_strong]:font-bold max-w-150 max-[769px]:text-4xl max-[601px]:text-3xl max-[426px]:text-2xl max-[321px]:text-xl"
            />

            <RichText
              data={page.description}
              className="text-bege text-lg font-intro [&_strong]:font-bold leading-6 max-w-140.5 max-[769px]:text-base"
            />
          </div>

          <div className="mt-28 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {page.services.map((service) => (
              <div
                key={service.id}
                className="border-2 border-white rounded-[40px] px-3 pt-3 flex flex-col group items-center h-115"
              >
                <div className="relative w-full h-57.5 rounded-[30px] overflow-hidden ">
                  <Image
                    src={isValidMedia(service.image) ? service.image.url! : '/default-image.png'}
                    alt="Service Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start mt-2 w-full pl-6 max-[1225px]:pl-0">
                  <h3 className="line-clamp-2 text-white text-2xl max-w-28 font-intro max-[1225px]:text-xl">
                    {service.title}
                  </h3>
                  <div>
                    <p className="font-intro font-light text-xs text-white">a partir de</p>
                    <p className="text-center mb-4 text-white font-light font-intro text-4xl max-[1225px]:text-2xl">
                      R$ {service.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center flex-col justify-center gap-5 ">
              <span className="text-3xl leading-9 text-white font-intro font-light max-w-58">
                Não encontrou algum serviço que deseja?
              </span>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Olá, estou interessado em um serviço`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant={'primary'} className="w-full max-w-58">
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
          </div>
        </Container>
      </div>
      <Footer data={settings} />
    </>
  )
}
