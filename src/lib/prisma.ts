import { PrismaClient } from '@prisma/client';

// Standard Next.js pattern: reuse one PrismaClient across hot reloads in dev
// instead of exhausting the DB connection pool with a new client per request.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
