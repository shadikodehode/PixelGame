import { useState } from "react"

function App() {
  const [screen, setScreen] = useState("menu")

  return (
    <>
      {screen === "menu" && <MenuScreen onStart={() => setScreen("game")} />}
      {screen === "game" && <div>Game goes here</div>}
    </>
  )
}

export default App
