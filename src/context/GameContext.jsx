import { createContext, useContext, useState } from "react"

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu")
  const [screenData, setScreenData]  = useState(null)

  const goTo = (nextScreen, data = null) =>{
    setScreen(nextScreen)
    setScreenData(data)
  }

  return (
    <GameContext.Provider value={{ screen, screenData, goTo }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}