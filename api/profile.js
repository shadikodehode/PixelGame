import { getDb } from "../lib/db.js";
import { verifyAuth } from "../lib/verifyAuth.js";

export default async function handler(req, res) {
  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const db = await getDb()
  const profiles = db.collection('profiles')

  if (req.method === 'GET') {
    const profile = await profiles.findOne({ user_id: userId })
    return res.status(200).json(profile)
  }

  if (req.method === 'POST') {
    const { username } =  req.body
    await profiles.updateOne(
      { user_id: userId },
      { $set: { username } }
    )
    return res.status(200).json({ message: 'Profile updated' })
  }

  res.status(405).end()
}