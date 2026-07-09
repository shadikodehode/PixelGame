import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = params.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/reset-password', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
    const data = await res.json()
    setMessage(data.message || data.error)
    if (res.ok) {
      setTimeout(() => navigate('/'), 1500)
    }
  }

  if (!token) return <p>Invalid reset link.</p>

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="password" 
        placeholder="New password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        minLength={8} 
      />
      <button type="submit">Reset password</button>
      <p>{message}</p>
    </form>
  )
}