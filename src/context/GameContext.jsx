import { createContext, useContext, useState } from "react"

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu")
  const [screenData, setScreenData]  = useState(null)
  const [activeModal, setActiveModal] = useState(null)

  const goTo = (nextScreen, data = null) =>{
    setScreen(nextScreen)
    setScreenData(data)
  }

  const openModal = (modalName) => setActiveModal(modalName)
  const closeModal = () => setActiveModal(null)

  return (
    <GameContext.Provider value={{ screen, screenData, goTo, activeModal, openModal, closeModal }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}