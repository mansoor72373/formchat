import { NextResponse } from 'next/server';
import { buildOpenApiDocument } from '@/lib/openapi/spec';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(buildOpenApiDocument());
}
