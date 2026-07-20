import { verifyAuth } from "../lib/verifyAuth.js"
import { getDb } from "../lib/db.js"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
    
  const userId = verifyAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const normalizedUserId = String(userId)

  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Invalid request body' })
  }

  const { save_data } = req.body

  if (typeof save_data !== 'object' || save_data === null || Array.isArray(save_data)) {
    return res.status(400).json({ error: 'Invalid save data' })
  }

  const payLoadSize = JSON.stringify(save_data).length
  if (payLoadSize > 500_000) {
    return res.status(413).json({ error: 'Save data too large' })
  }

  try {
    const db = await getDb()
    const saves = db.collection('saves')

    await saves.updateOne(
      { user_id: normalizedUserId },
      {
        $set: { save_data, updated_at: new Date() },
        $setOnInsert: { user_id: normalizedUserId, created_at: new Date() }
      },
      { upsert: true }
    )

    return res.status(200).json({ message: 'Saved' })
  } catch (err) {
    console.error('Save error:', err)
    return res.status(500).json({ error: 'Failed to save' })
  }
}

 