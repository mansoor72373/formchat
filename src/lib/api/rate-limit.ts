import type { NextRequest } from 'next/server';
import { Errors } from './errors';

// In-memory sliding window: fine for one instance. Swap for Redis/Upstash when scaling out.
const hits = new Map<string, number[]>();

export function rateLimit(req: NextRequest, bucket: string, limit: number, windowMs: number) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) throw Errors.tooManyRequests();
  recent.push(now);
  hits.set(key, recent);
}
