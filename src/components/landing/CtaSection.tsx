import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { buttonStyles } from '@/components/ui/Button';

export function CtaSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white shadow-2xl shadow-ink/15 sm:flex-row sm:items-center sm:px-12 sm:py-14">
        <div aria-hidden="true" className="absolute -right-20 -top-36 -z-10 h-96 w-96 rounded-full border-[3rem] border-brand-700/40" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-200">
            Your next conversation starts here
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to hear what people really think?
          </h2>
          <p className="mt-3 text-brand-100">Create your first form in just a few minutes.</p>
        </div>
        <Link
          href="/register"
          className={buttonStyles('secondary', 'lg', 'shrink-0 border-transparent bg-paper-raised hover:bg-brand-50')}
        >
          Get started for free
        </Link>
      </Container>
    </section>
  );
}
