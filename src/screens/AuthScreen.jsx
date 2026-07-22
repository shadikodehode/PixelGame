import { useState } from "react"
import { useGame } from "../context/GameContext.jsx"
import Login from "../components/Login.jsx"
import Signup from "../components/Signup.jsx"
import RequestReset from "../components/RequestReset.jsx"
import MenuButton from "../components/MenuButton.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function AuthScreen() {
  const { goTo } = useGame()
  const [authView, setAuthView] = useState("login")

  const  backToMenu = () => goTo("menu")

  return (
    <CenterDiv>
      {authView === "reset" ?(
        <>
          <RequestReset />
          <MenuButton onClick={() => setAuthView("login")}>Back to login</MenuButton>
        </>
      ) : (
        <>
          <Signup />
          <Login onSuccess={backToMenu} />
          <MenuButton onClick={() => setAuthView("reset")}>Forgot  password?</MenuButton>
        </>
      )}
      <MenuButton onClick={backToMenu}>Back</MenuButton>
    </CenterDiv>
  )
}