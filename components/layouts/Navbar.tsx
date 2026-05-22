'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { title: 'About Us', href: '#' },
  { title: 'Products', href: '#' },
  { title: 'Services', href: '#' },
  { title: 'Pricing', href: '#' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mid = Math.ceil(NAV_ITEMS.length / 2)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [mobileOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className={`mx-auto flex max-w-7xl  bg-background rounded-full backdrop-blur-md border border-white/20 items-center justify-between mt-7 gap-6 px-4 py-3 sm:px-6 lg:px-8 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>

          {/* Left nav - Hidden on tablet/mobile */}
          <nav className="hidden flex-1 items-center justify-end gap-8 text-md text-foreground lg:flex">
            {NAV_ITEMS.slice(0, mid).map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="transition-colors hover:text-foreground/70"
              >
                {title}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <a href="#" aria-label="Synvanta home" className="shrink-0 px-3 lg:px-6">
            <Image
              src="/navbar.png"
              alt="Synvanta"
              width={160}
              height={48}
              className="h-8 w-auto object-contain sm:h-10"
              priority
            />
          </a>

          {/* Right nav + actions */}
          <div className="flex flex-1 items-center justify-end gap-4 lg:justify-start lg:gap-8">
            <nav className="hidden flex-1 items-center gap-8 text-md text-foreground lg:flex">
              {NAV_ITEMS.slice(mid).map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="transition-colors hover:text-foreground/70"
                >
                  {title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="hidden lg:inline-flex">
                <Link href="/contact">Work With Us</Link>
              </Button>

              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <XIcon className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu popup */}
      <nav
        className={`fixed rounded-2xl shadow-sm right-5 top-26 z-50 w-72 max-w-[90vw] origin-top-right rounded-b-lg border border-border/60 bg-background transition-all duration-300 sm:top-16 lg:hidden ${
          mobileOpen
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0'
        }`}
      >
        <div className="space-y-1 p-4">
          {NAV_ITEMS.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              onClick={closeMobileMenu}
              className="block rounded-md px-4 py-3 text-md text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {title}
            </Link>
          ))}
        </div>
        <div className="border-t border-border/60 p-4">
          <Button className="w-full">
            <Link href="/contact" onClick={closeMobileMenu}>
              Work With Us
            </Link>
          </Button>
        </div>
      </nav>
    </>
  )
}