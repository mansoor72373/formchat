import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { requirePageUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requirePageUser();
  return (
    <div className="min-h-dvh">
      <DashboardHeader user={user} />
      <Container className="py-8 sm:py-10">{children}</Container>
    </div>
  );
}
