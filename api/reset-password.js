import crypto from "crypto"
import bcrypt from "bcryptjs"
import { getDb } from "../lib/db.js"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export default async function handler(req, res) {
  if (req.method !== 'POST')  return res.status(405).end()

  const { token, password } = req.body
  if (!token || !password) return res.status(400).json({ error: 'Missing fields'})

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and inclube uppercase, lowercase, and a number'})
    }

    const  hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const db = await getDb()
    const resetRecord = await db.collection('password_resets').findOne({ token: hashedToken })

    if (!resetRecord) return res.status(400).json({ error: 'Invalid or expired token' })

    const THIRTY_MIN = 30 * 60 * 1000
    if (Date.now() - resetRecord.created_at.getTime() > THIRTY_MIN) {
      await db.collection('password_resets').deleteOne({ _id: resetRecord._id })
      return res.status(400).json({ error: 'Invalid or expired otken'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.collection('users').updateOne(
      { _id: resetRecord.user_id },
      { $set: { password: hashedPassword }}
    )

    await db.collection('password_resets').deleteOne({ _id: resetRecord._id })

    res.status(200).json({ message: 'Password updated' })
}