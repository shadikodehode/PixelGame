import { getDb } from "../lib/db.js";
import { verifyAuth } from "../lib/verifyAuth.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const db = await getDb()
  const saves = db.collection('saves')

  const save = await saves.findOne({ user_id: userId })
  res.status(200).json(save?.save_data ?? {})
}