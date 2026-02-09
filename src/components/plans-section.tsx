import Image from 'next/image'
import { isValidMedia } from '@/lib/media'
import { Button } from '@/components/ui/button'
import type { Media } from '@/payload-types'

interface PlanPrice {
  price: {
    title: string
    description: string
    price: string
    link: string
  }
  id?: string | null
}

interface PlanBenefit {
  benefit: string
  id?: string | null
}

interface Plan {
  color: string
  name: string
  image: string | Media
  description: string
  prices?: PlanPrice[] | null
  benefits?: PlanBenefit[] | null
  id?: string | null
}

interface PlansSectionProps {
  description: string
  plans?: Plan[] | null
}

export function PlansSection({ description, plans }: PlansSectionProps) {
  return (
    <div className="w-full pt-32 max-[600px]:pt-20">
      <div className="w-full max-w-277.75 mx-auto flex items-end gap-97 max-[1024px]:justify-between max-[1024px]:gap-0 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-10">
        <span className="text-white font-intro text-5xl leading-11 font-normal max-[769px]:text-3xl max-[769px]:leading-8">
          Escolha <br /> o <strong>melhor</strong> <br /> <strong>plano</strong>
        </span>
        <p className="text-lg text-white font-intro leading-6 max-w-89.25">{description}</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-14 mt-28 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 max-[600px]:mt-10">
        {plans?.map((plan, index) => {
          return (
            <div key={plan.id ?? index} className="w-full flex flex-col">
              <div className="w-full h-58.5 relative max-[768px]:w-100 max-[640px]:w-full">
                <Image
                  src={isValidMedia(plan.image) ? plan.image.url! : ''}
                  fill
                  alt=""
                  className="object-contain aspect-23/14"
                />
              </div>
              <div className="w-full px-7 min-h-68.75 mt-8 max-[768px]:min-h-fit">
                <p className="text-white font-intro text-lg leading-6 max-[640px]:text-base">
                  {plan.description}
                </p>
              </div>

              <div className="w-full flex flex-col space-y-7 mt-8">
                {plan.prices?.map((price, priceIndex) => {
                  if (priceIndex === 0) {
                    return (
                      <div
                        key={price.id ?? priceIndex}
                        className="w-full first:border-2 first:border-bege first:rounded-[40px] p-6"
                      >
                        <span className="text-white font-intro text-2xl font-bold leading-6">
                          {price.price.title}
                        </span>
                        <p className="text-white font-intro text-lg font-normal leading-6 mt-1.5">
                          {price.price.description}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between max-[1366px]:flex-col max-[1366px]:items-start max-[1366px]:gap-2.5">
                          <span className="text-white font-intro text-2xl font-bold leading-6">
                            {price.price.price}
                          </span>
                          <a href={price.price.link} target="_blank">
                            <Button variant={'primary'} className="w-40 min-w-0">
                              Assinar
                            </Button>
                          </a>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div key={price.id ?? priceIndex} className="w-full p-6">
                      <div className="w-full flex justify-between items-center max-[1280px]:flex-col max-[1280px]:items-start">
                        <span className="text-white font-intro text-2xl font-bold leading-6">
                          {price.price.title}
                        </span>
                        <p className="text-white font-intro text-lg font-normal leading-6 mt-1.5">
                          {price.price.description}
                        </p>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between max-[1366px]:flex-col max-[1366px]:items-start max-[1366px]:gap-2.5">
                        <span className="text-white font-intro text-2xl font-bold leading-6">
                          {price.price.price}
                        </span>
                        <a
                          href={price.price.link}
                          target="_blank"
                          className="min-w-40 h-11.25 px-8 flex items-center justify-center py-3 bg-transparent border border-[#D9CCB2] rounded-4xl text-[#D9CCB2] text-lg hover:bg-[#D9CCB2]/10 transition-colors"
                        >
                          Assinar
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="w-full flec flex-col space-y-5 mt-11">
                {plan.benefits?.map((benefit, benefitIndex) => (
                  <div key={benefit.id ?? benefitIndex} className="flex items-start space-x-2">
                    <div className="flex items-center justify-center bg-[#FDE044] rounded-[6px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={26}
                        height={26}
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M7.688 23.84a2.182 2.182 0 01-2.145-2.533l.838-5.163-3.596-3.713a2.182 2.182 0 011.23-3.676l4.87-.748 2.146-4.584a2.191 2.191 0 013.94 0L17.108 8l4.878.754a2.182 2.182 0 011.23 3.676l-3.593 3.699.835 5.178a2.177 2.177 0 01-3.202 2.257l-4.254-2.362-4.258 2.362c-.323.18-.687.275-1.057.276zM13 19.035c.37 0 .732.095 1.054.275l4.254 2.362-.827-5.18a2.196 2.196 0 01.588-1.87l3.593-3.7-4.875-.772a2.173 2.173 0 01-1.641-1.233L13.008 4.34A.036.036 0 0013 4.33l-2.147 4.588a2.17 2.17 0 01-1.64 1.23l-4.87.748L7.93 14.62a2.196 2.196 0 01.589 1.87l-.838 5.165 4.264-2.346c.322-.18.685-.274 1.054-.275z"
                          fill="#EBB130"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-intro text-lg font-normal leading-6 max-[640px]:text-base">
                      {benefit.benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
