'use client'

import { isValidMedia } from '@/lib/media'
import Image from 'next/image'
import { Container } from './container'
import Link from 'next/link'
import { Setting } from '@/payload-types'
import { useState } from 'react'

interface NavbarProps {
  settings: Setting
}

export const leftMenuItems = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Sobre', href: '/sobre' },
  { id: 3, label: 'Serviços', href: '/servicos' },
  { id: 4, label: 'Contato', href: '/contato' },
]

export const rightMenuItems = [
  { id: 5, label: 'Fidelidade', href: '/comunita' },
  { id: 6, label: 'Escolas', href: '/professionale' },
  { id: 7, label: 'Visagismo', href: '/visagismo' },
]

export function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="absolute z-20 top-0 w-full pt-5">
      <Container className="flex items-center justify-center">
        <div className="hidden lg:flex flex-1 items-center justify-center space-x-4 xl:space-x-8 2xl:space-x-24 pr-4 xl:pr-8 2xl:pr-12">
          {leftMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-barbershop-tan font-opensans text-sm text-[#D9CCB2] xl:text-base 2xl:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="shrink-0 mx-auto lg:mx-0">
          {isValidMedia(settings.siteLogo) && (
            <Image
              src={settings.siteLogo.url!}
              width={settings.siteLogo.width!}
              height={settings.siteLogo.height!}
              alt="Don Manera Logo"
              className="h-16 sm:h-20 md:h-24 w-auto"
            />
          )}
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end space-x-4 xl:space-x-6 2xl:space-x-16 pl-4 xl:pl-8 2xl:pl-12">
          {rightMenuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-barbershop-tan text-sm text-[#D9CCB2] xl:text-base 2xl:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <a
            href={settings.LinkAssinatura}
            className="px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 bg-transparent border border-[#D9CCB2] rounded-4xl text-[#D9CCB2] text-sm xl:text-base whitespace-nowrap"
          >
            Assinatura
          </a>
        </div>

        <button
          className="lg:hidden absolute right-4 top-8 text-bege z-20"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-10 bg-[#1a1a1a]/95 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full space-y-6 transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {leftMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#D9CCB2] text-xl font-opensans hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          {rightMenuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#D9CCB2] text-xl font-opensans hover:opacity-80 transition-opacity"
            >
              {item.label}
            </a>
          ))}
          <a
            href={settings.LinkAssinatura}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 min-w-40 px-8 py-3 bg-transparent border border-[#D9CCB2] rounded-4xl text-[#D9CCB2] text-lg hover:bg-[#D9CCB2]/10 transition-colors"
          >
            Assinatura
          </a>
        </div>
      </div>
    </nav>
  )
}
