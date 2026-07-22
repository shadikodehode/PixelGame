import { useAuth } from "../context/AuthContext.jsx"
import MenuButton from "./MenuButton.jsx"

export default function Logout() {
  const { logout } = useAuth()
  return <MenuButton onClick={logout}>Logout</MenuButton>
}