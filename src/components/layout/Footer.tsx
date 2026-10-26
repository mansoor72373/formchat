import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { siteConfig } from '@/config/site';
import { Container } from './Container';

const columns = [
  { title: 'Product', links: siteConfig.nav.map((n) => ({ label: n.label, href: n.href })) },
  {
    title: 'Account',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Create account', href: '/register' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-paper-line bg-paper-raised">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-6 text-ink-muted">{siteConfig.tagline}.</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              {col.title}
            </h2>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
            Contact
          </h2>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="break-all text-sm text-ink-muted transition-colors hover:text-brand-700"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
      <Container className="border-t border-paper-line py-5 text-sm text-ink-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </Container>
    </footer>
  );
}
