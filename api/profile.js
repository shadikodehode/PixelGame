import clientPromise from "../lib/mongodb.js";
import { verifyAuth } from "../lib/verifyAuth.js";

export default async function handler(req, res) {
  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const client = await clientPromise
  const db = client.db('SewerMike')
  const prifiles = db.collection('profiles')

  if (req.method === 'GET') {
    const profile = await profiles.findOne({ user_id: userId })
    return res.status(200).json(profile)
  }

  if (req.method === 'POST') {
    const { username } =  req.body
    await profiles.updatedOne(
      { user_id: userId },
      { $set: { username } }
    )
    return res.status(200).json({ message: 'Profile updated' })
  }

  res.status(405).end()
}