import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold text-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
        <MessageSquareText className="h-4 w-4" />
      </span>
      {siteConfig.name}
    </Link>
  );
}
