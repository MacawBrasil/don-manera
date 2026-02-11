'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Paperclip } from 'lucide-react'

import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function unformatPhone(value: string): string {
  return value.replace(/\D/g, '')
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.'),
  email: z.string().email('Digite um email válido.'),
  phone: z
    .string()
    .refine((val) => unformatPhone(val).length === 11, 'O telefone deve ter 11 dígitos.'),
  resume: z
    .instanceof(File, { message: 'Anexe seu currículo.' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'O arquivo deve ter no máximo 5MB.')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Formato inválido. Envie PDF ou DOC.',
    ),
})

export function FormWork() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      resume: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('resume', data.resume)

      const response = await fetch('/api/work', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar currículo.')
      }

      toast.success('Currículo enviado com sucesso!', {
        description: 'Entraremos em contato em breve.',
        position: 'top-center',
      })

      form.reset()
      setFileName(null)
    } catch (error) {
      toast.error('Erro ao enviar currículo', {
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        position: 'bottom-right',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <form
      id="form-work"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-122.5 flex flex-col items-start mt-0"
    >
      <FieldGroup className="gap-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="form-work-name"
                aria-invalid={fieldState.invalid}
                placeholder="Nome"
                autoComplete="name"
                className="min-h-16 font-intro text-black placeholder:text-black text-lg leading-6 border-[0.5px] border-[#151515] rounded-[10px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="form-work-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="email"
                className="min-h-16 font-intro text-black placeholder:text-black text-lg leading-6 border-[0.5px] border-[#151515] rounded-[10px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="form-work-phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="Telefone"
                autoComplete="tel"
                className="min-h-16 font-intro text-black placeholder:text-black text-lg leading-6 border-[0.5px] border-[#151515] rounded-[10px]"
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="resume"
          control={form.control}
          render={({ field: { onChange, value, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <input
                {...field}
                ref={fileInputRef}
                id="form-work-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    onChange(file)
                    setFileName(file.name)
                  }
                }}
              />
              <button
                type="button"
                onClick={handleFileClick}
                className="flex ml-6 mt-2 items-center gap-3 py-4 bg-transparent border-none cursor-pointer group max-[769px]:ml-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  className="group-hover:[&_path]:fill-bege"
                >
                  <path
                    d="M24.5441 19.4531V6.50391C24.5441 5.21164 23.4929 4.16016 22.2004 4.16016H14.8242V12.5391C14.8242 14.4777 13.2472 16.0547 11.3086 16.0547C9.36996 16.0547 7.79297 14.4777 7.79297 12.5391V7.5C7.79297 6.85272 8.31757 6.32812 8.96484 6.32812C9.61212 6.32812 10.1367 6.85272 10.1367 7.5V12.5391C10.1367 13.1852 10.6625 13.7109 11.3086 13.7109C11.9547 13.7109 12.4805 13.1852 12.4805 12.5391V3.51562C12.4805 2.86949 11.9547 2.34375 11.3086 2.34375C10.7677 2.34375 10.2873 2.7253 10.1665 3.25081C10.0351 3.82278 9.50523 4.19861 8.93738 4.15558C8.90785 4.15787 8.8781 4.16016 8.84766 4.16016H7.79297C6.5007 4.16016 5.44922 5.21164 5.44922 6.50391V25.3125C5.44922 26.6048 6.5007 27.6562 7.79297 27.6562H22.2006C23.4929 27.6562 24.5444 26.6048 24.5444 25.3125C24.5444 24.6652 25.069 24.1406 25.7162 24.1406C26.3633 24.1406 26.8881 24.6652 26.8881 25.3125C26.8881 27.8973 24.7852 30 22.2006 30H7.79297C5.20821 30 3.10547 27.8973 3.10547 25.3125V6.50391C3.10547 3.91914 5.20821 1.81641 7.79297 1.81641H8.2283C8.83209 0.713425 9.9939 0 11.3086 0C12.6311 0 13.7849 0.734253 14.385 1.81641H22.2004C24.7852 1.81641 26.8879 3.91914 26.8879 6.50391V19.4531C26.8879 20.1004 26.3633 20.625 25.716 20.625C25.069 20.625 24.5441 20.1004 24.5441 19.4531ZM8.96484 22.9688C8.31757 22.9688 7.79297 23.4933 7.79297 24.1406C7.79297 24.7879 8.31757 25.3125 8.96484 25.3125H17.4609C18.1082 25.3125 18.6328 24.7879 18.6328 24.1406C18.6328 23.4933 18.1082 22.9688 17.4609 22.9688H8.96484ZM22.1484 19.5117C22.1484 18.8644 21.6238 18.3398 20.9766 18.3398H8.96484C8.31757 18.3398 7.79297 18.8644 7.79297 19.5117C7.79297 20.159 8.31757 20.6836 8.96484 20.6836H20.9766C21.6238 20.6836 22.1484 20.159 22.1484 19.5117ZM20.9766 13.7695H18.2812C17.634 13.7695 17.1094 14.2941 17.1094 14.9414C17.1094 15.5887 17.634 16.1133 18.2812 16.1133H20.9766C21.6238 16.1133 22.1484 15.5887 22.1484 14.9414C22.1484 14.2941 21.6238 13.7695 20.9766 13.7695ZM20.9766 9.14062H18.2812C17.634 9.14062 17.1094 9.66522 17.1094 10.3125C17.1094 10.9598 17.634 11.4844 18.2812 11.4844H20.9766C21.6238 11.4844 22.1484 10.9598 22.1484 10.3125C22.1484 9.66522 21.6238 9.14062 20.9766 9.14062Z"
                    fill="black"
                  />
                </svg>
                <span className="font-intro text-black text-lg leading-6 group-hover:text-bege transition-colors max-[769px]:text-base">
                  {fileName || 'Anexar currículo'}
                </span>
              </button>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          variant={'primary'}
          type="submit"
          form="form-work"
          className="mt-10 w-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar currículo'}
        </Button>
      </FieldGroup>
    </form>
  )
}
