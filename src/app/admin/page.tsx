import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

// Gate pattern for every future /admin/* page: check the session server-side
// and redirect before rendering anything, rather than hiding UI client-side.
export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session) redirect('/api/auth/signin');
  if (role !== 'ADMIN') {
    return (
      <main className="admin-shell">
        <p>Signed in as {session.user?.email}, but this account isn&apos;t an ADMIN yet.</p>
        <p className="comment">// Promote yourself via `npx prisma studio` → User → role → ADMIN</p>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <h1>Admin</h1>
      <ul>
        <li><Link href="/admin/testimonials">Testimonials</Link></li>
        <li><Link href="/admin/clients">Clients served</Link></li>
        <li><Link href="/admin/posts">Daily updates / posts</Link></li>
      </ul>
      <p className="comment">// TODO: each of these is a CRUD screen over its Prisma model — /api/testimonials is the reference implementation to copy for the rest.</p>
    </main>
  );
}
