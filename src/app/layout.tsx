import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    'Build conversational forms, embed a chatbot widget on any website and collect responses in one dashboard.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
