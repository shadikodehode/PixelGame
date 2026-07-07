import { stringifySetCookie } from 'cookie'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', stringifySetCookie({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, 
  }))
  res.status(200).json({ message: 'Logged out' })
}