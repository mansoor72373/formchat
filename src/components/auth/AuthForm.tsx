'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { ApiClientError } from '@/lib/api/client';
import { authApi } from '@/lib/api/endpoints';

const COPY = {
  login: { submit: 'Log in', alt: 'New here?', altLink: 'Create an account', altHref: '/register' },
  register: {
    submit: 'Create account',
    alt: 'Already have an account?',
    altLink: 'Log in',
    altHref: '/login',
  },
} as const;

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const copy = COPY[mode];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      if (mode === 'login')
        await authApi.login({ email: data.email ?? '', password: data.password ?? '' });
      else
        await authApi.register({
          name: data.name ?? '',
          email: data.email ?? '',
          password: data.password ?? '',
        });
      router.replace('/dashboard');
      router.refresh();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setFieldErrors(err.fieldErrors);
        setError(Object.keys(err.fieldErrors).length ? null : err.message);
      } else setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <Alert>{error}</Alert>}
      {mode === 'register' && (
        <Field label="Name" htmlFor="name" error={fieldErrors.name}>
          <Input id="name" name="name" autoComplete="name" invalid={!!fieldErrors.name} required />
        </Field>
      )}
      <Field label="Email" htmlFor="email" error={fieldErrors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          invalid={!!fieldErrors.email}
          required
        />
      </Field>
      <Field
        label="Password"
        htmlFor="password"
        error={fieldErrors.password}
        hint={mode === 'register' ? 'At least 8 characters.' : undefined}
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          invalid={!!fieldErrors.password}
          required
        />
      </Field>
      <Button type="submit" className="w-full" loading={loading}>
        {copy.submit}
      </Button>
      <p className="text-center text-sm text-ink-muted">
        {copy.alt}{' '}
        <Link href={copy.altHref} className="font-medium text-brand-700 hover:underline">
          {copy.altLink}
        </Link>
      </p>
    </form>
  );
}
