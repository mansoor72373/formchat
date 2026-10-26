import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { buttonStyles } from '@/components/ui/Button';
import { ChatMock } from './ChatMock';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-paper-line bg-gradient-to-b from-brand-50/70 via-paper to-paper pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
      </div>
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-paper-raised/80 px-3.5 py-2 text-sm font-medium text-brand-800 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            A better way to ask
          </p>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Forms people
            <span className="block text-brand-700">want to finish.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl">
            Turn your questions into a thoughtful conversation. Share a link or add a chat widget to
            your site—then see every answer in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className={buttonStyles('primary', 'lg', 'shadow-lg shadow-brand-700/15')}
            >
              Create your first form <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="#demo" className={buttonStyles('secondary', 'lg')}>
              Try the live demo
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {['No code required', 'A link or one-line embed', 'Start for free'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-700" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-4 top-12 -rotate-3 rounded-[2rem] bg-brand-200/50"
          />
          <div className="relative w-full max-w-lg rotate-1">
            <ChatMock />
            <div className="absolute -bottom-7 -left-4 rounded-2xl border border-paper-line bg-paper-raised px-4 py-3 shadow-xl shadow-ink/10 sm:-left-10">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                Responses, organized
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">Every answer in one dashboard</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
