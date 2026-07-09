import { stringifySetCookie } from "cookie";

export function setTokenCookie(res, token, maxAge) {
  res.setHeader('Set-Cookie', stringifySetCookie({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  }))
}