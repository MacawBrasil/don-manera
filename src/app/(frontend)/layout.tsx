import React from 'react'
import './global.css'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

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

  return (
    <html lang="pt-BR">
      <body className={cn(intro.variable, openSans.variable, 'font-intro')}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
