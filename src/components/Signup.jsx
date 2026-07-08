import { useState } from 'react'

export default function Signup() {
  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setMessage(res.ok ? 'Account created!' : data.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required minLength={3} maxLength={20}/>
      <input name="password" placeholder="Password" onChange={handleChange} type="password" required minLength={8}/>
      <p>Must be 8+ characters with uppercase, lowercase, and a number</p>
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  )
}