import jwt from "jsonwebtoken"
import { parseCookie } from "cookie"

export function verifyAuth(req) {
  const cookies = parseCookie(req.headers.cookie || '')
  const token = cookies.token

  if (!token) return null
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.userId
  } catch {
    return null
  }
}