import clientPromise from "../lib/mongodb.js";
import { verifyAuth } from "../lib/verifyAuth.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
    
  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { save_data } = req.body

  const client = await clientPromise
  const db = client.db('SewerMike')
  const saves = db.collection('saves')

  await saves.updatedOne(
    { user_id: userId },
    { $set: { save_data, updated_at: new Date() } }
  )

  res.status(200).json({ message: 'Saved' })
}