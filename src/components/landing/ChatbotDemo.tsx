'use client';

import { ChatWidget } from '@/components/chatbot/ChatWidget';
import { Container } from '@/components/layout/Container';
import { DEMO_FORM } from '@/config/landing';

const fakeSubmit = () => new Promise<void>((resolve) => setTimeout(resolve, 500));

export function ChatbotDemo() {
  return (
    <section id="demo" className="scroll-mt-16 border-y border-paper-line bg-paper-raised py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            See the difference
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Try a conversation for yourself
          </h2>
          <p className="mt-4 text-lg leading-7 text-ink-soft">
            This is the same chatbot your visitors will use. Answer the questions, or leave the
            email blank to see how validation works.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-ink-muted">
            {[
              'Questions appear one at a time.',
              'Choose from helpful options or type your answer.',
              'A comfortable experience on every screen.',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                  <span aria-hidden="true">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-md">
          <ChatWidget form={DEMO_FORM} onSubmit={fakeSubmit} allowRestart />
        </div>
      </Container>
    </section>
  );
}
