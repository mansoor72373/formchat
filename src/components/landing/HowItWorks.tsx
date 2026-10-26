import { Container } from '@/components/layout/Container';
import { STEPS } from '@/config/landing';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Simple from the start
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From your first question to your first response
          </h2>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-paper-line bg-paper-raised p-5 shadow-sm shadow-ink/[0.03]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 overflow-hidden rounded-2xl bg-ink p-5 text-paper-raised shadow-xl shadow-ink/10 sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">
            Add it to your site
          </p>
          <pre className="overflow-x-auto text-xs leading-6 text-brand-100 sm:text-sm">
            <code>{'<script src="https://your-app.com/widget.js" data-form="your-form-id" async></script>'}</code>
          </pre>
        </div>
      </Container>
    </section>
  );
}
