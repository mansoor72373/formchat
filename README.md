# FormChat

Build conversational forms, embed a chatbot widget on any website, and manage responses from a dashboard.

**Flow:** create a form → publish it → paste one `<script>` tag on any site → visitors answer in a chat → read submissions in the dashboard.

## Stack

| Concern    | Choice                                                                          |
| ---------- | ------------------------------------------------------------------------------- |
| Framework  | Next.js 14 (App Router), React 18, TypeScript (strict)                          |
| UI         | Tailwind CSS                                                                    |
| API        | Next.js Route Handlers, versioned under `/api/v1`                               |
| Validation | Zod (single source of truth for validation, types **and** API docs)             |
| API docs   | OpenAPI 3 generated from the Zod schemas, served with Swagger UI at `/api-docs` |
| Database   | PostgreSQL (local Docker, Supabase, Neon…) via Drizzle ORM + SQL migrations     |
| Auth       | Email + password, bcrypt, signed JWT in an httpOnly cookie                      |

## Quick start

Requirements: Node 18.18+, Docker (or any PostgreSQL 14+).

```bash
git clone <your-repo-url> formchat && cd formchat
npm install

cp .env.example .env.local        # then set AUTH_SECRET (openssl rand -base64 32)
docker compose up -d              # starts PostgreSQL on :5432
npm run db:migrate                # creates tables

npm run dev                       # http://localhost:3000
```

`db:migrate` reads `DATABASE_URL` from the environment. If your shell doesn't load `.env.local`, run
`set -a; source .env.local; set +a` first (or use `dotenv-cli`).

### Try the whole flow (about 2 minutes)

1. Open `http://localhost:3000`, click **Get started**, create an account.
2. **New form** → add a few questions → **Publish**.
3. Open the **Share & embed** tab and copy the public link, or…
4. Open `http://localhost:3000/test-site.html?form=<your-form-slug>` — a pretend external website with the chat bubble loaded by the embed script.
5. Answer the questions, then open **Responses** in the dashboard.

## Scripts

| Command                           | What it does                                            |
| --------------------------------- | ------------------------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js dev server / production build / serve build     |
| `npm run lint` / `typecheck`      | ESLint / TypeScript                                     |
| `npm run db:generate`             | Create a SQL migration after editing `src/db/schema.ts` |
| `npm run db:migrate`              | Apply migrations (use this in CI/deploy)                |
| `npm run db:push`                 | Sync schema directly (local prototyping only)           |

## Project structure

```
src/
├─ app/                    Routing only. Pages compose components; no business logic.
│  ├─ (marketing)/         Landing page
│  ├─ (auth)/              /login, /register
│  ├─ (dashboard)/         Protected: dashboard, form builder, responses
│  ├─ f/[slug]/            Public form page
│  ├─ embed/[slug]/        Page rendered inside the widget iframe
│  ├─ api-docs/            Swagger UI
│  └─ api/v1/…             REST endpoints (thin: parse → service → respond)
├─ components/
│  ├─ ui/                  Design-system primitives (Button, Input, Card, Badge, …)
│  ├─ layout/              Navbar, footer, dashboard header, containers
│  ├─ landing/             One component per landing section
│  ├─ chatbot/             Chat UI: ChatWidget, bubbles, composer, choice buttons…
│  ├─ form-builder/        Builder: toolbar, tabs, question card, design, share…
│  ├─ dashboard/ responses/ auth/ docs/
├─ hooks/                  useChatFlow, useFormBuilder, useSaveForm, useForms (SWR) …
├─ services/               Business logic + DB access (auth, form, response, mappers)
├─ schemas/                Zod schemas: input (form/auth/response) and output DTOs
├─ lib/
│  ├─ api/                 errors, response envelope, route wrappers, parsing, rate limit, client
│  ├─ auth/                JWT + session helpers
│  ├─ openapi/             Registry + path definitions → OpenAPI document
│  ├─ validation/          Answer validation shared by chatbot AND API
│  └─ utils/
├─ db/                     Drizzle schema + client
├─ config/                 Constants, site copy, landing content, question-type metadata
└─ types/                  Types derived from Zod schemas
public/widget.js           The embeddable loader (framework-free)
drizzle/                   Generated SQL migrations
```

**Layering rule:** `route → service → db`. Routes never touch the database; services never touch HTTP.
Components never call `fetch` directly; they use `lib/api/endpoints.ts` or the SWR hooks.

## API

Interactive documentation: **`/api-docs`** (raw spec at `/api/v1/openapi`). Log in via the
`POST /auth/login` operation and "Try it out" works against your session cookie.

Conventions:

- Versioned base path `/api/v1`, resource-oriented URLs, correct verbs and status codes (201, 204, 401, 404, 409, 422, 429).
- Success: `{ "success": true, "data": …, "meta"?: … }`
- Error: `{ "success": false, "error": { "code", "message", "details"?: [{ "path", "message" }] } }`
- List endpoints paginate with `?page=&pageSize=` and return `meta`.
- Ownership is enforced in the service layer (another user's form returns 404, not 403, so ids can't be probed).
- Public endpoints (`/public/forms/{slug}`…) only expose **published** forms.

| Method             | Path                                            | Auth             |
| ------------------ | ----------------------------------------------- | ---------------- |
| POST               | `/auth/register`, `/auth/login`, `/auth/logout` | –                |
| GET                | `/auth/me`                                      | ✔                |
| GET, POST          | `/forms`                                        | ✔                |
| GET                | `/forms/stats`                                  | ✔                |
| GET, PATCH, DELETE | `/forms/{id}`                                   | ✔                |
| PATCH              | `/forms/{id}/status` (publish / unpublish)      | ✔                |
| GET                | `/forms/{id}/responses`                         | ✔                |
| GET                | `/public/forms/{slug}` (CORS enabled)           | –                |
| POST               | `/public/forms/{slug}/responses`                | – (rate limited) |

**Adding an endpoint:** add a Zod schema in `schemas/`, a function in `services/`, a thin `route.ts`
using `privateRoute`/`publicRoute`, and a `registerPath` entry in `lib/openapi/paths/`.

## Embedding the widget

```html
<script src="https://YOUR-APP/widget.js" data-form="FORM_SLUG" async></script>
```

- Renders a floating bubble (bottom-right) in the form's colour. The chat loads lazily in an iframe on first click, so it can't clash with the host site's CSS and costs nothing until opened.
- Full-screen on phones (≤480px), floating panel on desktop. `Esc` or the ✕ closes it.
- Renders nothing if the form is unpublished or deleted.
- Optional `data-color="#2563eb"` overrides the dashboard colour.

## Deploying (Vercel + Supabase)

1. Create a Supabase project and copy the **connection string** (use the pooled/"transaction" URL on serverless). Set `PGSSL=true`.
2. Run migrations once against it: `DATABASE_URL=… npm run db:migrate`.
3. Import the GitHub repo in Vercel and set `DATABASE_URL`, `PGSSL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL` (your final URL).
4. Deploy. Embed snippets and share links use the real origin automatically.

## Security notes

- Passwords hashed with bcrypt (cost 12); sessions are httpOnly, `SameSite=Lax`, `Secure` in production.
- Server re-validates every submission against the form's questions and discards unknown answer keys.
- Admin pages send `frame-ancestors 'self'`; only `/embed/*` may be framed by other sites.
- Rate limiting is in-memory (single instance). Replace `lib/api/rate-limit.ts` with Redis/Upstash when scaling horizontally.

## Known limitations (MVP scope)

No email verification or password reset, no CSV export, no drag-and-drop reordering (up/down buttons instead),
no automated test suite yet. Good next steps: Playwright E2E for the create → publish → embed → respond flow,
and unit tests for `validateAnswer` and `useChatFlow`.
