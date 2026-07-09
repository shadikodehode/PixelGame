import { getDb } from "./db.js"

export async function checkRateLimit(key, limit = 5, windowMs = 60000) {
  const db = await getDb()
  const rateLimits = db.collection('rate_limits')

  const now = Date.now()
  const record = await rateLimits.findOne({ key })

  if (!record || now - record.start > windowMs) {
    await rateLimits.updateOne(
      { key },
      { $set: { key, count: 1, start: now } },
      { upsert: true }
    )
    return true
  }

  if (record.count >= limit) {
    return false
  }

  await rateLimits.updateOne(
    { key },
    { $inc: { count: 1 } }
  )
  return true
}