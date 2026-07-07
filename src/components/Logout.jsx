export default function Logout() {
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    window.location.reload()
  }

  return <button onClick={handleLogout}>Logout</button>
}