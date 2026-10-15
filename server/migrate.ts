// Applies every not-yet-applied file in server/migrations, in name order, each in its own
// transaction. Runs on every Vercel production build, before the new code goes live, so the
// database shape always matches the code. Existing rows are never touched by re-running it.
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    if (process.env.VERCEL_ENV === 'production') throw new Error('DATABASE_URL is not set for production.')
    console.log('migrate: DATABASE_URL not set, skipping.')
    return
  }

  const client = new pg.Client({ connectionString: url })
  await client.connect()
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())`)
    const { rows } = await client.query<{ name: string }>('SELECT name FROM schema_migrations')
    const applied = new Set(rows.map((r) => r.name))
    const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort()

    for (const file of files) {
      if (applied.has(file)) continue
      const sql = await readFile(path.join(dir, file), 'utf8')
      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file])
        await client.query('COMMIT')
        console.log(`migrate: applied ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    }
    console.log('migrate: up to date')
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
