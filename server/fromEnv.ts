import { createApp, parseAdminEmails } from './app.js'
import { createPgStore } from './store.js'

/** Builds the app from environment settings. Names only; values live in Vercel or a git-ignored .env. */
export function createAppFromEnv() {
  const missing = ['DATABASE_URL', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'].filter((k) => !process.env[k])
  if (missing.length) console.error(`Missing settings: ${missing.join(', ')}`)

  return createApp({
    store: createPgStore(process.env.DATABASE_URL ?? ''),
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    adminEmails: parseAdminEmails(process.env.ADMIN_EMAILS),
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? 'local',
  })
}
