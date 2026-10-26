import { Container } from '@/components/layout/Container';
import { FEATURES } from '@/config/landing';

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-y border-paper-line bg-paper-raised py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Made for real conversations
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything you need to collect better answers
          </h2>
          <p className="mt-4 text-lg leading-7 text-ink-muted">
            A thoughtful form builder, a friendly chat experience, and a clear place to make sense
            of what people tell you.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="rounded-2xl border border-paper-line bg-paper p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-ink/[0.04]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
