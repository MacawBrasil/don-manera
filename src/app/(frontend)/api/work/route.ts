import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'settings' })

    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const resume = formData.get('resume') as File

    if (!name || !email || !phone || !resume) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 })
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'O arquivo deve ter no máximo 5MB.' }, { status: 400 })
    }

    if (!ACCEPTED_FILE_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: 'Formato inválido. Envie PDF ou DOC.' },
        { status: 400 },
      )
    }

    if (!settings.contactEmail) {
      return NextResponse.json({ error: 'Email de contato não configurado.' }, { status: 500 })
    }

    const arrayBuffer = await resume.arrayBuffer()
    const base64Content = Buffer.from(arrayBuffer).toString('base64')

    const msg = {
      to: settings.contactEmail,
      from: process.env.SENDGRID_EMAIL_FROM!,
      subject: `Novo currículo de ${name}`,
      text: `
Nome: ${name}
Email: ${email}
Telefone: ${phone}

Currículo em anexo.
      `,
      html: `
<h2>Novo currículo recebido</h2>
<p><strong>Nome:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Telefone:</strong> ${phone}</p>
<br/>
<p><strong>Currículo em anexo.</strong></p>
      `,
      attachments: [
        {
          content: base64Content,
          filename: resume.name,
          type: resume.type,
          disposition: 'attachment',
        },
      ],
    }

    await sgMail.send(msg)

    return NextResponse.json({ success: true, message: 'Currículo enviado com sucesso!' })
  } catch (error) {
    console.error('Erro ao enviar currículo:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar currículo. Tente novamente.' },
      { status: 500 },
    )
  }
}
