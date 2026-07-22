import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useSaveGame } from "../hooks/useSaveGame.js"
import { useAuth } from "./AuthContext.jsx"

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
    equippedArmor: null,
   },
  inventory: [],
  defeatedEnemies: [],
  defeatedBosses: [],
  openedChests: [],
  gold: 0,
  mapChests: {},
  mapEnemies: {},
  mapSeeds: {},
}

export function GameStateProvider({ children }) {
  const { isLoggedIn } = useAuth()
  const { savedData, loading, error, saveGame } = useSaveGame(isLoggedIn)
  const [gameState, setGameState] = useState(defaultState)
  const hydrated = useRef(false)
  const saveTimerRef = useRef(null)
  const latestSaveRef = useRef(null)

  useEffect(() => {
    if (!loading && !hydrated.current) {
      hydrated.current = true
      if (savedData && Object.keys(savedData).length > 0) {
        setGameState({
          ...defaultState,
          ...savedData,
          mapSeeds: savedData.mapSeeds ?? defaultState.mapSeeds,
        })
      }
    }
  }, [loading, savedData])

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
    }
  }, [])

  const scheduleSave = (nextState) => {
    if (!isLoggedIn) return

    latestSaveRef.current = nextState
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current)
    }

    saveTimerRef.current = setTimeout(() => {
      if (latestSaveRef.current) {
        saveGame(latestSaveRef.current)
        latestSaveRef.current = null
      }
      saveTimerRef.current = null
    }, 1000)
  }

  const updateGameState = (partialUpdate) => {
    setGameState((prev) => {
      const next = { 
        ...prev, 
        ...partialUpdate,
      hero: partialUpdate.hero ? { ...prev.hero, ...partialUpdate.hero } : prev.hero,
      mapChests: partialUpdate.hasOwnProperty('mapChests')
        ? { ...prev.mapChests, ...partialUpdate.mapChests }
        : prev.mapChests,
      mapEnemies: partialUpdate.hasOwnProperty('mapEnemies')
        ? { ...prev.mapEnemies, ...partialUpdate.mapEnemies }
        : prev.mapEnemies,
      mapSeeds: partialUpdate.hasOwnProperty('mapSeeds')
        ? { ...prev.mapSeeds, ...partialUpdate.mapSeeds }
        : prev.mapSeeds,
      }

      scheduleSave(next)
      return next
    })
  }

  const resetMap = (mapId = null) => {
    const nextMapChests = { ...gameState.mapChests }
    const nextMapEnemies = { ...gameState.mapEnemies }

    if (mapId) {
      delete nextMapChests[mapId]
      delete nextMapEnemies[mapId]
    } else {
      Object.keys(nextMapChests).forEach((key) => {
        delete nextMapChests[key]
        delete nextMapEnemies[key]
      })
    }

    updateGameState({
      currentMap: "floor1",
      playerPosition: { x: 1, y: 1 },
      mapChests: nextMapChests,
      mapEnemies: nextMapEnemies,
      mapSeeds: {},
      defeatedBosses: [],
      openedChests: [],
      defeatedEnemies: [],
    })
  }

  return (
    <GameStateContext.Provider 
      value={{ 
        gameState, 
        updateGameState, 
        loading, 
        resetMap,
        startNewGame,
        saveGame,
        saveError: error,
        canSave: isLoggedIn === true,      
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  return useContext(GameStateContext)
}