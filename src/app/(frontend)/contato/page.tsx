import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { FormContact } from './form'
import { RichText } from '@/components/RichText'
import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { FormWork } from './formWork'
import { Footer } from '@/components/footer'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  const page = await payload.findGlobal({
    slug: 'contato',
    depth: 10,
  })

  return (
    <>
      <div className="w-full bg-terra max-[769px]:pb-10">
        <Navbar settings={settings} />
        <Container className="pt-59.25 max-[600px]:pt-48">
          <div>
            <span className="text-white font-intro text-5xl leading-11 font-thin max-[769px]:text-3xl max-[769px]:leading-8">
              Vamos <strong>falar</strong> <br /> <strong>um pouco?</strong>
            </span>

            <div className="mt-20 flex gap-22.5 max-[769px]:flex-col">
              <FormContact />

              <div className="bg-bege px-12 py-16 rounded-[40px] translate-y-10 max-[769px]:translate-0">
                <div>
                  <span className="text-terra font-intro font-bold text-2xl leading-7">
                    Unidades
                  </span>
                  <div className="w-full grid grid-cols-2 gap-28 mt-6 max-[1280px]:grid-cols-1 max-[1280px]:gap-3.5">
                    {settings.unidades?.map((unidade) => (
                      <div key={unidade.id} className="flex flex-col gap-2.5">
                        <h2 className="text-[#151515] font-intro text-lg font-bold leading-6">
                          {unidade.nome}
                        </h2>
                        <RichText
                          className="text-[#151515] font-intro text-lg font-normal leading-6"
                          data={unidade.address}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <span className="text-terra font-intro font-bold text-2xl leading-7">
                    Horários de atendimento
                  </span>
                  <div className="w-full grid grid-cols-2 gap-28 mt-6 max-[1280px]:grid-cols-1 max-[1280px]:gap-3.5">
                    {settings.unidades?.map((unidade) => (
                      <div key={unidade.id} className="flex flex-col gap-2.5">
                        <h2 className="text-[#151515] font-intro text-lg font-bold leading-6">
                          {unidade.nome}
                        </h2>
                        <RichText
                          className="text-[#151515] font-intro text-lg font-normal leading-6"
                          data={unidade.openingHours}
                        />
                        <div className="flex items-center gap-2.5 mt-8 max-[1280px]:mt-0">
                          <a href={unidade.linkInstagram!} target="_blank">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={40}
                              height={40}
                              viewBox="0 0 40 40"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1_1119)" fill="#673032">
                                <path d="M23.828 20a3.828 3.828 0 11-7.656 0 3.828 3.828 0 017.656 0z" />
                                <path d="M28.953 13.227a3.558 3.558 0 00-.86-1.32 3.555 3.555 0 00-1.32-.86c-.404-.157-1.012-.344-2.132-.395-1.211-.055-1.574-.067-4.64-.067-3.068 0-3.43.012-4.642.067-1.12.051-1.727.238-2.132.395-.499.184-.95.478-1.32.86a3.56 3.56 0 00-.86 1.32c-.157.405-.344 1.013-.395 2.132-.055 1.211-.067 1.574-.067 4.641s.012 3.43.067 4.641c.051 1.12.238 1.728.395 2.132.185.5.478.95.86 1.32.37.382.82.676 1.32.86.405.157 1.013.344 2.132.395 1.211.056 1.574.067 4.64.067 3.068 0 3.431-.011 4.642-.067 1.12-.05 1.728-.238 2.132-.395a3.803 3.803 0 002.18-2.18c.157-.404.344-1.012.395-2.132.056-1.211.067-1.574.067-4.64 0-3.068-.011-3.43-.067-4.642-.05-1.12-.238-1.727-.395-2.132zM20 25.897a5.897 5.897 0 110-11.794 5.897 5.897 0 010 11.794zm6.13-10.65a1.378 1.378 0 110-2.756 1.378 1.378 0 010 2.757z" />
                                <path d="M20 0C8.956 0 0 8.956 0 20s8.956 20 20 20 20-8.956 20-20S31.044 0 20 0zm11.415 24.735c-.055 1.222-.25 2.057-.534 2.788a5.872 5.872 0 01-3.358 3.358c-.73.284-1.566.478-2.788.534-1.225.056-1.616.07-4.735.07s-3.51-.014-4.735-.07c-1.222-.056-2.057-.25-2.787-.534a5.626 5.626 0 01-2.035-1.324 5.628 5.628 0 01-1.324-2.034c-.284-.73-.478-1.566-.534-2.788-.056-1.225-.07-1.616-.07-4.735s.014-3.51.07-4.735c.055-1.222.25-2.057.533-2.788.289-.766.741-1.46 1.325-2.034a5.625 5.625 0 012.034-1.324c.731-.284 1.566-.478 2.788-.534 1.225-.056 1.616-.07 4.735-.07s3.51.014 4.735.07c1.222.056 2.057.25 2.788.533a5.63 5.63 0 012.034 1.325 5.626 5.626 0 011.324 2.034c.285.731.479 1.566.534 2.788.056 1.225.07 1.616.07 4.735s-.014 3.51-.07 4.735z" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1119">
                                  <path fill="#fff" d="M0 0H40V40H0z" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>

                          <a href={unidade.linkWhatsapp!} target="_blank">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={40}
                              height={40}
                              viewBox="0 0 40 40"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1_1127)" fill="#673032">
                                <path d="M25.526 14.474l-.04-.04a7.766 7.766 0 00-12.407 9.008l.342.674-.64 3.1v.04l3.071-.73.7.348A7.77 7.77 0 0025.5 25.41a7.771 7.771 0 00.026-10.937zm-.31 8.684c-.377.592-.974 1.316-1.719 1.497-1.316.319-3.318 0-5.826-2.318l-.032-.03c-2.181-2.036-2.76-3.733-2.631-5.078.076-.763.713-1.453 1.25-1.905a.713.713 0 011.118.263l.808 1.842a.71.71 0 01-.087.726l-.41.527a.697.697 0 00-.056.776c.39.574.857 1.092 1.387 1.54a8.05 8.05 0 001.921 1.376.695.695 0 00.76-.16l.472-.477a.715.715 0 01.723-.221l1.921.552a.718.718 0 01.406 1.074l-.006.016z" />
                                <path d="M20 0a20 20 0 100 40 20 20 0 000-40zm9.913 20.234A9.925 9.925 0 0115.582 28.8l-5 1.19a.387.387 0 01-.466-.456l1.052-5.11a9.922 9.922 0 1118.753-4.19h-.008z" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1127">
                                  <path fill="#fff" d="M0 0H40V40H0z" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-83 flex items-center flex-col pb-38.25 max-[1280px]:mt-20">
        <div className="relative w-full h-68 flex items-center pl-35.75 max-[769px]:pl-3">
          <Image
            src={isValidMedia(page.work.banner) ? page.work.banner.url! : ''}
            fill
            alt=""
            className="object-cover rounded-[45px] -z-10"
          />

          <Image
            src={isValidMedia(page.work.image) ? page.work.image.url! : ''}
            width={isValidMedia(page.work.image) ? page.work.image.width! : 601}
            height={isValidMedia(page.work.image) ? page.work.image.height! : 454}
            alt=""
            className="object-contain z-10 absolute right-20 bottom-0 max-[1280px]:hidden"
          />

          <span className="text-white font-intro font-bold leading-12 text-5xl max-w-90 max-[769px]:text-3xl max-[769px]:leading-8 ">
            {page.work.titleBanner}
          </span>
        </div>

        <div className="w-full mt-16 flex justify-center gap-11 max-[1024px]:flex-col">
          <div className="flex flex-col max-w-133 max-[768px]:max-w-full">
            <RichText
              data={page.work.description}
              className="text-[#151515] text-lg font-intro leading-6 max-[769px]:text-base"
            />
            <span className="text-[#151515] text-lg font-intro leading-6 font-bold mt-5 max-[769px]:text-base">
              Vantagens de fazer parte da equipe Don Manera
            </span>
            <ul className="mt-7 space-y-5">
              {page.work.advantages.map((advantage, index) => (
                <li
                  key={index}
                  className="text-[#151515] text-lg font-intro leading-6 flex items-center gap-2.5 max-[769px]:text-base"
                >
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
                      d="M14.005 1.757c6.764 0 12.25 5.486 12.25 12.25s-5.486 12.25-12.25 12.25-12.25-5.486-12.25-12.25 5.486-12.25 12.25-12.25zm-2.544 16.23l-2.999-3.002a1.315 1.315 0 010-1.857 1.318 1.318 0 011.856 0l2.114 2.116 5.26-5.26a1.315 1.315 0 011.856 0c.511.512.51 1.346 0 1.857l-6.19 6.189a1.316 1.316 0 01-1.897-.044z"
                      fill="#151515"
                    />
                  </svg>
                  {advantage.title}
                </li>
              ))}
            </ul>
          </div>

          <FormWork />
        </div>
      </Container>

      <Footer data={settings} />
    </>
  )
}
