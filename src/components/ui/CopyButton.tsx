'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from './Button';

interface CopyButtonProps {
  value: string;
  label?: string;
  variant?: 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

export function CopyButton({
  value,
  label = 'Copy',
  variant = 'secondary',
  size = 'sm',
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={!value}
      onClick={() => copy(value)}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : label}
    </Button>
  );
}
