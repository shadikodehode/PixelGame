import clientPromise from "../lib/mongodb.js";
import { verifyAuth } from "../lib/verifyAuth.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const client = await clientPromise
  const db = client.db('SewerMike')
  const saves = db.collection('saves')

  const save = await saves.findOne({ user_id: userId })
  res.status(200).json(save?.save_data ?? {})
}