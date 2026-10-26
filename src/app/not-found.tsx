import Link from 'next/link';
import { buttonStyles } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-4 text-center">
      <h1 className="text-2xl font-semibold text-ink">This page isn’t available</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        The link may be wrong, or the form may have been unpublished by its owner.
      </p>
      <Link href="/" className={buttonStyles()}>
        Back to home
      </Link>
    </main>
  );
}
