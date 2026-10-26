'use client';

import { useEffect, useRef } from 'react';

const VERSION = '5.17.14';
const CDN = `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${VERSION}`;

declare global {
  interface Window {
    SwaggerUIBundle?: (config: Record<string, unknown>) => void;
  }
}

function load(tag: 'script' | 'link', url: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement(tag);
    if (el instanceof HTMLScriptElement) el.src = url;
    else {
      (el as HTMLLinkElement).rel = 'stylesheet';
      (el as HTMLLinkElement).href = url;
    }
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(el);
  });
}

export function SwaggerUI({ specUrl }: { specUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      load('link', `${CDN}/swagger-ui.css`),
      load('script', `${CDN}/swagger-ui-bundle.js`),
    ]).then(() => {
      if (cancelled || !window.SwaggerUIBundle) return;
      window.SwaggerUIBundle({ url: specUrl, domNode: ref.current, deepLinking: true });
    });
    return () => {
      cancelled = true;
    };
  }, [specUrl]);

  return <div ref={ref} className="min-h-screen bg-white" />;
}
