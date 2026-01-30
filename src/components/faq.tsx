import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqQuestion {
  question: string
  answer: string
  id?: string | null
}

interface FaqProps {
  description: string
  questions?: FaqQuestion[] | null
}

export function Faq({ description, questions }: FaqProps) {
  if (!questions || questions.length === 0) return null

  return (
    <div className="w-full mt-32 max-[600px]:mt-20">
      <span className="text-white font-intro font-light text-5xl leading-11 max-[769px]:text-3xl max-[769px]:leading-8">
        Perguntas <br /> frequentes
      </span>
      <div className="w-full h-0.5 bg-linear-30 from-bege to-terra mt-12 mb-8" />

      <div className="w-full flex justify-between max-[1024px]:flex-col max-[1024px]:gap-10">
        <p className="text-white font-intro text-lg leading-6 max-w-83.75">{description}</p>

        <Accordion
          type="single"
          collapsible
          defaultValue={questions[0].id!}
          className="w-159.5 space-y-3 max-[1024px]:w-full"
        >
          {questions.map((question, index) => (
            <AccordionItem key={index} value={question.id!} className="border-none">
              <AccordionTrigger className="min-h-16.25 text-lg font-intro font-bold leading-6 border-[0.5px] p-4 border-bege text-white data-[state=open]:border-b-0 data-[state=open]:rounded-b-none max-[600px]:pr-12 max-[600px]:text-base">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-white text-sm font-intro leading-4 border-[0.5px] border-t-0 border-bege rounded-b-md">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
