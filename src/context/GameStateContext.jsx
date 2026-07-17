import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useSaveGame } from "../hooks/useSaveGame.js"

const GameStateContext = createContext(null)

const defaultState = {
  currentMap: "floor1",
  playerPosition: { x: 1, y: 1 },
  hero: { 
    health: 100, 
    maxHealth: 100, 
    baseStrength: 10, 
    baseDefense: 5, 
    level: 1,
    equippedWeapon: null,
    quippedArmor: null,
   },
  inventory: [],
  defeatedEnemies: [],
  defeatedBosses: [],
  openedChests: [],
  gold: 0,
  mapChests: {},
  mapEnemies: {},
}

export function GameStateProvider({ children }) {
  const { savedData, loading, saveGame } = useSaveGame()
  const [gameState, setGameState] = useState(defaultState)
  const hydrated = useRef(false)

  useEffect(() => {
    if (!loading && !hydrated.current) {
      hydrated.current = true
      if (savedData && Object.keys(savedData).length > 0) {
        setGameState(savedData)
      }
    }
  }, [loading, savedData])

  const updateGameState = (partialUpdate) => {
    setGameState((prev) => {
      const next = { 
        ...prev, 
        ...partialUpdate,
      hero: partialUpdate.hero ? { ...prev.hero, ...partialUpdate.hero } : prev.hero,
      mapChests: partialUpdate.mapChests ? { ...prev.mapChests, ...partialUpdate.mapChests } : prev.mapChests,
      mapEnemies: partialUpdate.mapEnemies ? { ...prev.mapEnemies, ...partialUpdate.mapEnemies} : prev.mapEnemies,
     }
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