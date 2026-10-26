import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthShell } from '@/components/auth/AuthShell';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to manage your forms.">
      <AuthForm mode="login" />
    </AuthShell>
  );
}
