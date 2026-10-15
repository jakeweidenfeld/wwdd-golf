App: https://wwdd-golf.vercel.app
API: https://wwdd-golf.vercel.app/api
Protected: /api/me

# Deploying the WWDD site

## Hosts

| part | host | notes |
| --- | --- | --- |
| Frontend (React + Vite) | Vercel | Built from `main` and served as static files. |
| Backend (Express API in `server/`) | Vercel Functions | `api/index.ts` handles every `/api/*` request, on the same domain as the frontend. |
| Database (PostgreSQL) | Neon, added through Vercel's Storage tab | Production has its own database. Local development uses a separate Neon branch. |

Every push to `main` deploys automatically. Vercel's build command (in `vercel.json`) is
`npm test && npm run migrate && npm run build`: if a test fails the deploy stops, and database
migrations run before the new code goes live. Migrations in `server/migrations/` only add to the
schema, and each one is applied once, so existing rows survive every redeploy.

## Settings

Names only. Values are never committed. Locally they go in `.env`, which `.gitignore` covers.

| setting | where it is set | what it is |
| --- | --- | --- |
| `DATABASE_URL` | Vercel project settings (Production), added by the Neon integration | Postgres connection string |
| `GOOGLE_CLIENT_ID` | Vercel project settings (Production) | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Vercel project settings (Production) | Google OAuth client secret |
| `ADMIN_EMAILS` | Vercel project settings (Production) | Comma-separated Google emails that get the admin role at sign-in |
| `VERCEL_GIT_COMMIT_SHA` | Set by Vercel automatically | Commit returned by `GET /api/version` |

The frontend's build needs no settings.

Google OAuth redirect URIs, both registered on one OAuth client:
`https://wwdd-golf.vercel.app/api/auth/callback` and `http://localhost:5173/api/auth/callback`.

## Who may do what

Enforced in `server/app.ts`, on the server. Hiding a button in React is never the only check.

| level | who | can |
| --- | --- | --- |
| Visitor | anyone, not signed in | See the public site. Every `/api/*` route except `/api/version` and sign-in answers **401**. |
| Member | anyone who signs in with Google | Save and edit **only their own** 2027 interest entry. See past finishes, teams and scores. |
| Admin | signed-in users whose email is in `ADMIN_EMAILS` | Everything members can do, plus: see all members and the full interest list, and add or remove results. Members calling admin routes get **403**. |

The role is recomputed at every sign-in, so removing an email from `ADMIN_EMAILS` takes effect the
next time that person signs in.

## Running locally

```
npm install
npm run migrate      # against the DATABASE_URL in .env (a dev branch, never production)
npm run dev:api      # API on :3001
npm run dev          # site on :5173, proxies /api to :3001
```
