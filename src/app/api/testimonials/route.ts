import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// This route is the reference pattern for the rest of the admin-editable
// content (clients, posts, payment methods): GET is public and only returns
// approved rows; POST requires an ADMIN session. Copy this shape for the
// other models rather than inventing a new one per route.

const TestimonialInput = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(1),
  accent: z.string().default('blue')
});

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = TestimonialInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const created = await prisma.testimonial.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
