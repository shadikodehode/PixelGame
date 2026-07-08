import { useAuth } from "../context/AuthContext.jsx"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import Logout from "./Logout.jsx"
import SaveTest from "./SaveTest.jsx"

export default function AuthGate() {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn === null)  return <p>Loading...</p>

  return isLoggedIn ? (
    <>
      <Logout />
      <SaveTest />
    </>
  ) : (
    <>
      <Signup />
      <Login />
    </>
  )
}