import clientPromise from "../lib/mongodb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { stringifySetCookie } from "cookie"

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  const client = await clientPromise
  const db = client.db('SewerMike')
  const user = await db.collection('users').findOne({ email })

  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid login'})
  }
  
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  res.setHeader('Set-Cookie', stringifySetCookie({
    name: 'token', 
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  }))

  res.status(200).json({ message: 'Logged in' })
}