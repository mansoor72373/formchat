'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { buttonStyles } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { siteConfig } from '@/config/site';
import { Container } from './Container';

export function MarketingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line/80 bg-paper/95 shadow-sm shadow-ink/[0.03] backdrop-blur-xl">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-brand-700 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonStyles('ghost', 'sm', 'px-3')}>
            Log in
          </Link>
          <Link
            href="/register"
            className={buttonStyles('primary', 'sm', 'gap-1.5 px-4 shadow-sm')}
          >
            Get started
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-paper-line bg-paper-raised text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile main"
          className="border-t border-paper-line bg-paper-raised px-5 py-4 shadow-lg shadow-ink/[0.04] md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-paper-line pt-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={buttonStyles('secondary', 'md', 'flex-1')}
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={buttonStyles('primary', 'md', 'flex-1')}
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
