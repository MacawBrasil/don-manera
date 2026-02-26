'use client'

import { isValidMedia } from '@/lib/media'
import Image from 'next/image'
import { Container } from './container'
import Link from 'next/link'
import { Setting } from '@/payload-types'
import { useState, useEffect } from 'react'

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
  { id: 5, label: 'Fidelidade', href: '/rimborso' },
  { id: 6, label: 'Escola', href: '/professionale' },
  { id: 7, label: 'Visagismo', href: '/visagismo' },
]

export function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Menu - fora do nav para funcionar corretamente com fixed */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-[#1a1a1a]/95 transition-opacity duration-300 ${
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
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#D9CCB2] text-xl font-opensans hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={'/lp'}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 min-w-40 px-8 py-3 bg-transparent border border-[#D9CCB2] rounded-4xl text-[#D9CCB2] text-lg hover:bg-[#D9CCB2]/10 transition-colors"
          >
            Assinatura
          </Link>
        </div>
      </div>

      <nav
        className={`fixed z-50 top-0 w-full transition-all duration-300 ${
          scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-sm py-3' : 'bg-transparent pt-5'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Menu Esquerdo */}
          <div className="hidden xl:flex items-center gap-23.5">
            {leftMenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="font-open-sans text-sm text-bege xl:text-base 2xl:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Botão Menu Mobile (esquerda) */}
          <button
            className="xl:hidden justify-self-start text-bege z-50 order-2"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Logo Central */}
          <div className="">
            {isValidMedia(settings.siteLogo) && (
              <Link href="/">
                <Image
                  src={settings.siteLogo.url!}
                  width={settings.siteLogo.width!}
                  height={settings.siteLogo.height!}
                  alt="Don Manera Logo"
                  className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto"
                />
              </Link>
            )}
          </div>

          {/* Menu Direito + Botão Assinatura */}
          <div className="hidden xl:flex items-center gap-11">
            <div className="flex items-center gap-14">
              {rightMenuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="font-open-sans text-sm text-bege xl:text-base 2xl:text-lg hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={'/lp'}
              className="px-4 xl:px-6 py-2 bg-transparent font-open-sans font-bold border border-[#D9CCB2] rounded-4xl text-[#D9CCB2] text-sm xl:text-lg whitespace-nowrap hover:bg-[#D9CCB2]/10 transition-colors"
            >
              Assinatura
            </Link>
          </div>
        </Container>
      </nav>
    </>
  )
}
