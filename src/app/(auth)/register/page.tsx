import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthShell } from '@/components/auth/AuthShell';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Start building conversational forms.">
      <AuthForm mode="register" />
    </AuthShell>
  );
}
