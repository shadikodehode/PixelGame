import { useAuth } from "../context/AuthContext.jsx"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import RequestReset from "./RequestReset.jsx"
import { useState } from "react"
import CenterDiv from "../containers/CenterDiv.jsx"


export default function AuthGate({ children }) {
  const { isLoggedIn } = useAuth()
  const [authView, setAuthView] = useState("login")

  if (isLoggedIn === null)  return (
    <CenterDiv>
       <p>Loading...</p>
    </CenterDiv>
  )

  if (!isLoggedIn) {
    if (authView === "reset" ) {
      return (
        <CenterDiv>
          <RequestReset />
          <button onClick={() => setAuthView("login")}>Back to login</button>
        </CenterDiv>
      )
    }
    return (
      <CenterDiv>
        <Signup />
        <Login />
        <button onClick={() => setAuthView("reset")}>Forgot password?</button>
      </CenterDiv>
    )
  }

  return children
}