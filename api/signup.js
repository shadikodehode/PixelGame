import bcrypt from 'bcryptjs'
import { getDb } from "../lib/db.js"
import { validateSignup } from "../lib/validators.js"
import { checkRateLimit } from '../lib/rateLimit.js'

export default async function handler(req, res) {
  if (req.method != 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for'] || 'unknown'
    if (!(await checkRateLimit(ip))) {
      return res.status(429).json({ error: 'Too many attempts, try again later'})
    }

  const { email, username, password } = req.body

  const error = validateSignup(req.body)
  if (error) return res.status(400).json({ error })
    
  const db = await getDb()
  const users = db.collection('users')

  const existing = await users.findOne({ email })
  if (existing) return res.status(409).json({ error: 'Email already in use' })

  const hashedPassword = await bcrypt.hash(password, 12)
  const result = await users.insertOne({
    email,
    password: hashedPassword,
    created_at: new Date()
  })

  const userId = result.insertedId
  const normalizedUserId = String(userId)

  await db.collection('profiles').insertOne({ user_id: normalizedUserId, username })
  await db.collection('saves').insertOne({ user_id: normalizedUserId, save_data: {}, updated_at: new Date() })

  res.status(201).json({ message: 'User created' })
}

