'use client';

import { Card } from '@/components/ui/Card';
import { useStats } from '@/hooks/useForms';
import { BarChart3, FileText, Radio } from 'lucide-react';

export function StatsCards() {
  const { data } = useStats();
  const items = [
    { label: 'Total forms', value: data?.totalForms, icon: FileText },
    { label: 'Published forms', value: data?.publishedForms, icon: Radio },
    { label: 'Total responses', value: data?.totalResponses, icon: BarChart3 },
  ];

  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="flex items-center justify-between p-5 sm:p-6">
          <div>
            <dt className="text-sm font-medium text-ink-muted">{item.label}</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-ink">
              {item.value ?? '–'}
            </dd>
          </div>
          <item.icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
        </Card>
      ))}
    </dl>
  );
}
