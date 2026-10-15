// Local API server. Vite (npm run dev) proxies /api here, so sign-in works at http://localhost:5173.
import { createAppFromEnv } from './fromEnv.js'

const port = Number(process.env.API_PORT ?? 3001)
createAppFromEnv().listen(port, () => console.log(`API on http://localhost:${port}`))
