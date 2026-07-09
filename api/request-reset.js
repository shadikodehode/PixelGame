
import crypto from "crypto"
import { getDb } from "../lib/db.js"
import { resend } from "../lib/resend.js"
import { checkRateLimit } from "../lib/rateLimit.js"

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  
  const ip =  req.headers['x-forwarded-for'] || 'unknown'
  if (!(await checkRateLimit(ip))) {
    return res.status(429).json({ error: 'Too many attempts, try again later'})
  }

  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Missing email' })

  const db = await getDb()
  const user = await db.collection('users').findOne({ email })

  if (!user) return res.status(200).json({ message: 'If that email exists, a reset link was sent' })

    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await db.collection('password_resets').updateOne(
      { user_id: user._id },
      { $set: { token: hashedToken, created_at: new Date() }},
      { upsert: true }
    )

    const resetUrl = `${process.env.SITE_URL}/reset-password?token=${rawToken}`
    

   const { data, error } = await resend.emails.send({
      from:'onboarding@resend.dev',
      to: email,
      subject: 'Reset your SewerMike password',
      html: `<P>Click to reset your password:</p><a href="${resetUrl}">${resetUrl}</a><p>This link expires in 30 minutes.</p>`,
    })

    if(error) {
      console.error('Resend error', error)
    }

    res.status(200).json({ message: 'if that email exists, a reset link was sent' })
}