import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';

// Role-based access lives on the User model (see prisma/schema.prisma).
// The first account you sign in with will be created as VIEWER by default —
// promote yourself to ADMIN once via `npx prisma studio` after first login.
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  session: { strategy: 'database' },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as typeof session.user & { id: string; role: string }).id = user.id;
        (session.user as typeof session.user & { id: string; role: string }).role =
          (user as unknown as { role: string }).role;
      }
      return session;
    }
  },
  pages: {
    // Falls back to NextAuth's default pages until you build custom ones.
  }
};
