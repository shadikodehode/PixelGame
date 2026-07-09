import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { getDb } from "../lib/db.js";
import { setTokenCookie } from "../lib/cookies.js";
import { checkRateLimit } from "../lib/rateLimit.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for'] || 'unknown'
  if (!(await checkRateLimit(ip))) {
    return res.status(429).json({ error: 'Too many attempts, try again later'})
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid login'})
  }

  const db = await getDb()
  const user = await db.collection('users').findOne({ email })

  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  setTokenCookie(res, token, 7 * 24 * 60 * 60)

  res.status(200).json({ message: 'Logged in' })
}