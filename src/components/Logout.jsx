import { useAuth } from "../context/AuthContext.jsx"

export default function Logout() {
  const { logout } = useAuth()

  return <button onClick={logout}>Logout</button>
}