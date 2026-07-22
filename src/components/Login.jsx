import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx" 

export default function Login({ onSuccess }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '',})
  const [message, setMessage] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      login()
      onSuccess?.()
    } else {
      setMessage(data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required/>
      <input name="password" placeholder="Password" onChange={handleChange} type="password" required minLength={8}/>
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  )
}