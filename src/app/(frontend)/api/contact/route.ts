import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'settings' })

    const data: ContactFormData = await request.json()

    const { name, email, phone, message } = data

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 })
    }

    if (!settings.contactEmail) {
      return NextResponse.json({ error: 'Email de contato não configurado.' }, { status: 500 })
    }

    const msg = {
      to: settings.contactEmail,
      from: process.env.SENDGRID_EMAIL_FROM!,
      subject: `Novo contato de ${name}`,
      text: `
Nome: ${name}
Email: ${email}
Telefone: ${phone}

Mensagem:
${message}
      `,
      html: `
<h2>Novo contato do site</h2>
<p><strong>Nome:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Telefone:</strong> ${phone}</p>
<br/>
<p><strong>Mensagem:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json({ success: true, message: 'Email enviado com sucesso!' })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json({ error: 'Erro ao enviar email. Tente novamente.' }, { status: 500 })
  }
}
