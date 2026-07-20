import { getDb } from "../lib/db.js"
import { verifyAuth } from "../lib/verifyAuth.js"

export default async function handler(req, res) {
  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') {
    try {
      const db = await getDb()
      const profiles = db.collection('profiles')
      const profile = await profiles.findOne({ user_id: userId })
      return res.status(200).json(profile ?? {})
    } catch (err) {
      console.error('Profile load error:', err)
      return res.status(500).json({ error: 'Failed to load profile' })
    }
  }

  if (req.method === 'POST') {
    const { username } = req.body

    if (typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({ error: 'Invalid username' })
    }

    try {
      const db = await getDb()
      const profiles = db.collection('profiles')
      await profiles.updateOne(
        { user_id: userId },
        { $set: { username: username.trim() } },
        { upsert: true }
      )
      return res.status(200).json({ message: 'Profile updated' })
    } catch (err) {
      console.error('Profile update error:', err)
      return res.status(500).json({ error: 'Failed to update profile' })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).end()
}