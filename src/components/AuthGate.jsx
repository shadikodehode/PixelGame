import { useAuth } from "../context/AuthContext.jsx"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import Logout from "./Logout.jsx"
import RequestReset from "./RequestReset.jsx"
import { useState } from "react"


export default function AuthGate({ children }) {
  const { isLoggedIn } = useAuth()
  const [authView, setAuthView] = useState("login")

  if (isLoggedIn === null)  return <p>Loading...</p>

  if (!isLoggedIn) {
    if (authView === "reset" ) {
      return (
        <>
          <RequestReset />
          <button onClick={() => setAuthView("login")}>Back to login</button>
        </>
      )
    }
    return (
      <>
        <Signup />
        <Login />
        <button onClick={() => setAuthView("reset")}>Forgot password?</button>
      </>
    )
  }

  return (
    <>
      <Logout />
      {children}
    </>
  )
}