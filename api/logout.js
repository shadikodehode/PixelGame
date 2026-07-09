import { setTokenCookie } from '../lib/cookies.js'

export default function handler(req, res) {
  setTokenCookie(res, '', 0)
  res.status(200).json({ message: 'Logged out' })
}