import { useState } from "react";

export default function SaveTest() {
  const [message, setMessage] = useState('')

  const handleLoad = async () => {
    const res = await fetch('/api/load', { credentials: 'include' })
    const data = await res.json()
    setMessage(JSON.stringify(data))
  }

  const handleSave = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ save_data: { testValue: 123 } })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  const handleProfile = async () => {
    const res = await fetch('/api/profile', { credentials: 'include' })
    const data = await res.json()
    setMessage(JSON.stringify(data))
  }

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleProfile}>Get Profile</button>
      <p>{message}</p>
    </div>
  )
}