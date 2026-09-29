# MKM Portfolio

Mubashir Khan Mohammed's personal portfolio — a live "dependency graph" of nine
sections (About, Resume, LinkedIn, Clients Served, Tech & Services,
Testimonials, Payment, Contact QR, Daily Updates) radiating from a central
hub, styled like a dark code editor.


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

## Contributing

Standard flow: branch off `main`, open a PR — `ci.yml` runs lint + build
automatically. Since this is a personal project intended to grow, favor
small PRs that each add one working vertical slice (model → API → UI) over
large multi-feature branches.
