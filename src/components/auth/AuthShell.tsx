import type { ReactNode } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';

const benefits = [
  'Build a form without writing code',
  'Share it anywhere with a link or embed',
  'Keep every response neatly organized',
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-dvh bg-paper lg:grid-cols-2">
      <aside className="relative isolate hidden overflow-hidden bg-ink px-12 py-10 text-paper-raised lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div aria-hidden="true" className="absolute -bottom-48 -right-44 -z-10 h-[36rem] w-[36rem] rounded-full border-[5rem] border-brand-700/30" />
        <Logo />
        <div className="max-w-xl py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-200">
            Better questions. Better conversations.
          </p>
          <h2 className="mt-5 text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
            Make every answer count.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-paper-raised/70">
            Give people a more human way to respond, and give your team a clearer view of what
            matters.
          </p>
          <ul className="mt-9 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-paper-raised/85">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-700/50 text-brand-100">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-paper-raised/50">A more thoughtful way to collect feedback.</p>
      </aside>

      <section className="flex min-h-dvh flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <Card className="w-full max-w-md p-6 sm:p-9">
          <p className="text-sm font-medium text-brand-700">
            {title === 'Log in' ? 'Welcome back' : 'Get started'}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>
          <p className="mb-7 mt-2 text-sm leading-6 text-ink-muted">{subtitle}</p>
          {children}
        </Card>
        <p className="mt-7 flex items-center gap-1.5 text-xs text-ink-muted">
          Built for better conversations <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </p>
      </section>
    </main>
  );
}
