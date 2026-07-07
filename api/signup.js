import clientPromise from "../lib/mongodb.js";
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method != 'POST') return res.status(405).end()
    
  const { email, username, password } = req.body
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }
}

const client = await clientPromise
const db = client.db('SewerMike')
const users = db.collection('users')

const existing = await users.findOne({ email })
if (existing) return res.status(409).json({ error: 'Email already in use' })

const hashedPassword = await bcrypt.hash(password, 10)
const result = await users.insertOne({
  email,
  password: hashedPassword,
  created_at: new Date()
})

const userId = result.insertedId

await db.collection('profiles').insertOne({ user_id: userId, username })
await db.collection('saves').insertOne({ user_id: userId, save_data: {}, updated_at: new Date() })

res.status(201).json({ message: 'User created' })