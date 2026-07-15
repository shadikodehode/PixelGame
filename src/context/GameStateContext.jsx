import { createContext, useContext, useState } from "react"
import { useSaveGame } from "../hooks/useSaveGame.js"

const GameStateContext = createContext(null)

const defaultState = {
  currentMap: "floor1",
  playerPosition: { x: 1, y: 1 },
  hero: { health: 100, maxHealth: 100, strength: 10, defense: 5, level: 1 },
  inventory: [],
  defeatedEnemies: [],
  openedChests: [],
}

export function GameStateProvider({ children }) {
  const { savedData, loading, saveGame } = useSaveGame()
  const [gameState, setGameState] = useSate(defaultState)

  useState(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      setGameState(savedData)
    }
  }, [savedData])

  const updateGameState = (partialUpdate) => {
    setGameState((pref) => {
      const next = { ...pref, ...partialUpdate }
      saveGame(next)
      return next
    })
  }

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState, loading }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  return useContext(GameStateContext)
}