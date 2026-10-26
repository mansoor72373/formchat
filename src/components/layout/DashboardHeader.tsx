'use client';

import { FilePlus2, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { authApi } from '@/lib/api/endpoints';
import type { UserDTO } from '@/types/form';
import { Container } from './Container';

export function DashboardHeader({ user }: { user: UserDTO }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await authApi.logout();
    router.replace('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-paper-line bg-paper-raised/95 shadow-sm shadow-ink/[0.02] backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Logo href="/dashboard" />
        <nav aria-label="Dashboard" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-brand-700"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Forms</span>
          </Link>
          <Link
            href="/dashboard/forms/new"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-brand-50 px-3 text-sm font-medium text-brand-800 transition-colors hover:bg-brand-100"
          >
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">New form</span>
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="hidden max-w-32 truncate text-sm font-medium text-ink-soft md:inline">{user.name}</span>
          <Button variant="ghost" size="sm" onClick={logout} loading={loading} aria-label="Log out">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </Container>
    </header>
  );
}
