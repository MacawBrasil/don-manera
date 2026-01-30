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
                <Paperclip className="w-6 h-6 text-black group-hover:text-bege transition-colors" />
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
