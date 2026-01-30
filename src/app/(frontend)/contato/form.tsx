'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.'),
  email: z.string().email('Digite um email válido.'),
  phone: z
    .string()
    .refine((val) => unformatPhone(val).length === 11, 'O telefone deve ter 11 dígitos.'),
  message: z
    .string()
    .min(20, 'A mensagem deve ter pelo menos 20 caracteres.')
    .max(500, 'A mensagem deve ter no máximo 500 caracteres.'),
})

export function FormContact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem.')
      }

      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em breve.',
        position: 'top-center',
      })

      form.reset()
    } catch (error) {
      toast.error('Erro ao enviar mensagem', {
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        position: 'bottom-right',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id="form-contact"
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
                id="form-contact-name"
                aria-invalid={fieldState.invalid}
                placeholder="Nome"
                autoComplete="name"
                className="min-h-16 font-intro text-white placeholder:text-white text-lg leading-6 border-[0.5px] border-bege rounded-[10px]"
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
                id="form-contact-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="email"
                className="min-h-16 font-intro text-white placeholder:text-white text-lg leading-6 border-[0.5px] border-bege rounded-[10px]"
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
                id="form-contact-phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="Telefone"
                autoComplete="tel"
                className="min-h-16 font-intro text-white placeholder:text-white text-lg leading-6 border-[0.5px] border-bege rounded-[10px]"
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                id="form-contact-message"
                placeholder="Mensagem"
                rows={6}
                className="min-h-36 resize-none font-intro text-white placeholder:text-white text-lg leading-6 border-[0.5px] border-bege rounded-[10px]"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          variant={'primary'}
          type="submit"
          form="form-contact"
          className="mt-10 w-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
      </FieldGroup>
    </form>
  )
}
