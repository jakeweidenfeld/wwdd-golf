// Vercel Function: every /api/* request is rewritten here (see vercel.json) and handled by Express.
import { createAppFromEnv } from '../server/fromEnv.js'

export default createAppFromEnv()
