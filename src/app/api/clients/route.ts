import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Read-only for now — same POST/auth pattern as /api/testimonials
// should be added here once the admin "Clients" screen is built.
export async function GET() {
  const clients = await prisma.client.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(clients);
}
