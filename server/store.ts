import pg from 'pg'

export type Role = 'member' | 'admin'

export type User = {
  id: number
  email: string
  name: string | null
  picture: string | null
  role: Role
}

export type GoogleProfile = { sub: string; email: string; name?: string; picture?: string }

export type Interest = { play: boolean; sponsor: boolean; volunteer: boolean; note: string }

export type Result = {
  id: number
  year: number
  place: number | null
  teamName: string | null
  players: string[]
  score: string | null
  note: string | null
}

export type NewResult = Omit<Result, 'id'>

/** Everything the API needs from the database. Tests swap in an in-memory version. */
export interface Store {
  upsertUser(profile: GoogleProfile, role: Role): Promise<User>
  createSession(userId: number, tokenHash: string, expiresAt: Date): Promise<void>
  userForSession(tokenHash: string): Promise<User | null>
  deleteSession(tokenHash: string): Promise<void>
  listUsers(): Promise<(User & { createdAt: string })[]>
  getInterest(userId: number): Promise<Interest | null>
  putInterest(userId: number, interest: Interest): Promise<Interest>
  listInterest(): Promise<(Interest & { user: Pick<User, 'name' | 'email'>; updatedAt: string })[]>
  listResults(): Promise<Result[]>
  addResult(result: NewResult): Promise<Result>
  deleteResult(id: number): Promise<boolean>
}

const userCols = 'id, email, name, picture, role'
const resultCols = 'id, year, place, team_name AS "teamName", players, score, note'

export function createPgStore(connectionString: string): Store {
  const pool = new pg.Pool({ connectionString, max: 3 })

  return {
    async upsertUser(p, role) {
      const { rows } = await pool.query<User>(
        `INSERT INTO users (google_sub, email, name, picture, role)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (google_sub) DO UPDATE
           SET email = EXCLUDED.email, name = EXCLUDED.name, picture = EXCLUDED.picture,
               role = EXCLUDED.role, last_sign_in_at = now()
         RETURNING ${userCols}`,
        [p.sub, p.email, p.name ?? null, p.picture ?? null, role],
      )
      return rows[0]
    },
    async createSession(userId, tokenHash, expiresAt) {
      await pool.query('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)', [tokenHash, userId, expiresAt])
    },
    async userForSession(tokenHash) {
      const { rows } = await pool.query<User>(
        `SELECT u.id, u.email, u.name, u.picture, u.role FROM sessions s JOIN users u ON u.id = s.user_id
         WHERE s.token_hash = $1 AND s.expires_at > now()`,
        [tokenHash],
      )
      return rows[0] ?? null
    },
    async deleteSession(tokenHash) {
      await pool.query('DELETE FROM sessions WHERE token_hash = $1', [tokenHash])
    },
    async listUsers() {
      const { rows } = await pool.query(`SELECT ${userCols}, created_at AS "createdAt" FROM users ORDER BY created_at DESC`)
      return rows
    },
    async getInterest(userId) {
      const { rows } = await pool.query<Interest>('SELECT play, sponsor, volunteer, note FROM interest WHERE user_id = $1', [userId])
      return rows[0] ?? null
    },
    async putInterest(userId, i) {
      const { rows } = await pool.query<Interest>(
        `INSERT INTO interest (user_id, play, sponsor, volunteer, note) VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id) DO UPDATE
           SET play = EXCLUDED.play, sponsor = EXCLUDED.sponsor, volunteer = EXCLUDED.volunteer,
               note = EXCLUDED.note, updated_at = now()
         RETURNING play, sponsor, volunteer, note`,
        [userId, i.play, i.sponsor, i.volunteer, i.note],
      )
      return rows[0]
    },
    async listInterest() {
      const { rows } = await pool.query(
        `SELECT i.play, i.sponsor, i.volunteer, i.note, i.updated_at AS "updatedAt",
                json_build_object('name', u.name, 'email', u.email) AS "user"
         FROM interest i JOIN users u ON u.id = i.user_id ORDER BY i.updated_at DESC`,
      )
      return rows
    },
    async listResults() {
      const { rows } = await pool.query<Result>(`SELECT ${resultCols} FROM results ORDER BY year DESC, place ASC NULLS LAST, id`)
      return rows
    },
    async addResult(r) {
      const { rows } = await pool.query<Result>(
        `INSERT INTO results (year, place, team_name, players, score, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${resultCols}`,
        [r.year, r.place, r.teamName, r.players, r.score, r.note],
      )
      return rows[0]
    },
    async deleteResult(id) {
      const { rowCount } = await pool.query('DELETE FROM results WHERE id = $1', [id])
      return (rowCount ?? 0) > 0
    },
  }
}
