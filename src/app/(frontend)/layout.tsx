import React from 'react'
import './global.css'
import configPromise from '@payload-config'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { WhatsappMenu } from '@/components/whatsapp-menu'
import { getPayload } from 'payload'

const openSans = Open_Sans({ subsets: ['latin'], style: 'normal', variable: '--font-open-sans' })

const intro = localFont({
  variable: '--font-intro',
  src: [
    {
      path: './fonts/Intro/Intro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Intro/Intro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Intro/Intro-Thin.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Intro/Intro-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 10,
  })

  return (
    <html lang="pt-BR">
      <body className={cn(intro.variable, openSans.variable, 'font-intro')}>
        <main>{children}</main>
        <Toaster />
        <WhatsappMenu settings={settings} />
      </body>
    </html>
  )
}
