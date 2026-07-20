import { getDb } from "../lib/db.js"
import { verifyAuth } from "../lib/verifyAuth.js"

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const normalizedUserId = String(userId)
  res.setHeader('Cache-Control', 'no-store')

  try {
    const db = await getDb()
    const saves = db.collection('saves')

    const save = await saves.findOne({ user_id: normalizedUserId })
    const saveData = save?.save_data
    const isValidSave = typeof saveData === 'object' && saveData !== null && !Array.isArray(saveData)

    return res.status(200).json(isValidSave ? saveData : {})
  } catch (err) {
    console.error('Load error:', err)
    return res.status(500).json({ error: 'Failed to load save' })
  }
}