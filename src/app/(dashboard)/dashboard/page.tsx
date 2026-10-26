import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FormList } from '@/components/dashboard/FormList';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PageHeader } from '@/components/layout/PageHeader';
import { buttonStyles } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHeader
        title="Your forms"
        description="Create, publish and review the forms you share."
        actions={
          <Link href="/dashboard/forms/new" className={buttonStyles()}>
            <Plus className="h-4 w-4" /> New form
          </Link>
        }
      />
      <StatsCards />
      <FormList />
    </div>
  );
}
