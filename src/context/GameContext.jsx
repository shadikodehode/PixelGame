import { createContext, useContext, useState } from "react"

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu")

  const goTo = (nextScreen) => setScreen(nextScreen)

  return (
    <GameContext.Provider value={{ screen, goTo }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}