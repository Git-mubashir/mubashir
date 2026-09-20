# MKM Portfolio

Mubashir Khan Mohammed's personal portfolio — a live "dependency graph" of nine
sections (About, Resume, LinkedIn, Clients Served, Tech & Services,
Testimonials, Payment, Contact QR, Daily Updates) radiating from a central
hub, styled like a dark code editor.

This repo is a rebuild of an earlier single-file HTML prototype into a real,
database-backed Next.js app — the goal is an actively-developed project with
admin-managed content, multi-user roles, and eventually its own subdomain(s),
not a static page.

## Stack

| Layer          | Choice                                    | Why |
|----------------|--------------------------------------------|-----|
| Framework      | **Next.js 14** (App Router) + TypeScript   | SSR/SSG, API routes, and a natural place to add an admin dashboard without a separate backend service |
| Styling        | **Tailwind CSS** + a small custom stylesheet for the circular graph geometry | Fast iteration; the graph's rotate/translate positioning isn't expressible as utility classes, so it stays in `globals.css` |
| Animation      | **Framer Motion**                          | Idiomatic React animation (replaces the original's direct GSAP DOM calls) for the modal transitions and magnetic node hover |
| Database       | **PostgreSQL** via **Prisma ORM**          | Needed the moment content (testimonials, clients, posts) is admin-editable instead of hardcoded |
| Auth           | **NextAuth.js** (GitHub OAuth + Prisma adapter) | Session + role-based access (`ADMIN` / `EDITOR` / `VIEWER`) for the future multi-user admin |
| Validation     | **Zod**                                    | Typed request validation on API routes |
| QR codes       | **`qrcode`** (npm)                          | Real vCard QR generation client-side, no external CDN dependency |
| CI             | **GitHub Actions**                          | Lint + build on every push/PR |
| Hosting (recommended) | **Vercel**                          | First-class Next.js support, trivial custom-domain/subdomain setup, preview deployments per PR |

## Project structure

```
mkm-portfolio/
├── .github/workflows/ci.yml       # lint + build on push/PR
├── prisma/
│   ├── schema.prisma               # User/Role, Testimonial, Client, Post, PaymentMethod
│   └── seed.ts                     # seeds the current placeholder content
├── public/
│   └── resume.pdf                  # served directly — no base64 embedding needed outside Claude's sandbox
├── src/
│   ├── app/
│   │   ├── layout.tsx               # root layout, self-hosted fonts via next/font
│   │   ├── page.tsx                 # homepage → <DependencyGraph />
│   │   ├── admin/page.tsx           # role-gated dashboard stub
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── testimonials/route.ts   # GET public, POST requires ADMIN — reference pattern
│   │       └── clients/route.ts
│   ├── components/
│   │   ├── graph/
│   │   │   ├── DependencyGraph.tsx  # hub + 9 nodes + modal, Framer Motion
│   │   │   └── sections-data.tsx    # section content, incl. DB-fetched Clients/Testimonials
│   │   └── ui/ContactQR.tsx         # real vCard QR via the `qrcode` package
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth config + role session callback
│   │   └── prisma.ts                # PrismaClient singleton
│   └── styles/globals.css
├── .env.example
└── tailwind.config.ts
```

## Getting started

```bash
git clone <this-repo>
cd mkm-portfolio
npm install
cp .env.example .env        # fill in DATABASE_URL, NEXTAUTH_SECRET, GITHUB_ID/SECRET
npx prisma migrate dev --name init
npm run seed                # loads the current clients/testimonials/payment content
npm run dev
```

Open `http://localhost:3000`. To reach `/admin`, sign in via GitHub, then
promote your own user to `ADMIN` once with `npx prisma studio` (User → role).

## Roadmap

This scaffold intentionally ships one complete vertical slice
(`Client`/`Testimonial` models → `/api/*` → the homepage sections) as the
pattern to repeat, rather than every screen half-built. Next steps, roughly
in order:

1. **Admin CRUD screens** — `/admin/testimonials`, `/admin/clients`,
   `/admin/posts` (create/edit/delete forms over the existing API routes;
   `/api/testimonials`'s `POST` handler is the template for the rest).
2. **`Post` model → Daily Updates** — replace the Medium-sync idea entirely
   with your own posts, authored from `/admin`. Solves the live-sync problem
   Medium's iframe/CORS restrictions made impossible in the old version.
3. **Multi-user roles in practice** — invite a second GitHub account, assign
   `EDITOR`, and confirm the permission boundary in `/api/testimonials`
   actually holds.
4. **Subdomains** — once deployed on Vercel, a subdomain (e.g.
   `admin.yourdomain.com` pointed at the same project, or a separate Vercel
   project for a distinct app) is a DNS + `vercel.json` `rewrites`/multi-zone
   config away. Worth doing only once the admin app has enough surface area
   to justify separating it from the public site.
5. **Tech & Services section** — still lorem ipsum; lowest priority since
   it's pure content, no new plumbing needed.

## Contributing

Standard flow: branch off `main`, open a PR — `ci.yml` runs lint + build
automatically. Since this is a personal project intended to grow, favor
small PRs that each add one working vertical slice (model → API → UI) over
large multi-feature branches.
