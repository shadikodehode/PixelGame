import { useEffect } from "react"
import { useGameState } from "../context/GameStateContext.jsx"
import { generateFloorEntities } from "../game/floorGenerator.js"

function makeMapSeed(mapId) {
  return `${mapId}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function useFloorEntities(mapId, map) {
  const { gameState, updateGameState } = useGameState()

  useEffect(() => {
    const existingSeed = gameState.mapSeeds[mapId]

    if (!existingSeed) {
      const seed = makeMapSeed(mapId)
      const { chests, enemies } = generateFloorEntities(map, seed)
      updateGameState({
        mapSeeds: { [mapId]: seed },
        mapChests: { [mapId]: chests },
        mapEnemies: { [mapId]: enemies },
      })
      return
    }

    if (!gameState.mapChests[mapId] || !gameState.mapEnemies[mapId]) {
      const { chests, enemies } = generateFloorEntities(map, existingSeed)
      updateGameState({
        mapChests: { [mapId]: chests },
        mapEnemies: { [mapId]: enemies },
      })
    }
  }, [mapId, map, gameState.mapSeeds, gameState.mapChests, gameState.mapEnemies, updateGameState])

  const liveEnemies = (gameState.mapEnemies[mapId] || [])
    .filter((e) => !gameState.defeatedEnemies.includes(e.id))

  const bossAlive = map.boss && !gameState.defeatedBosses.includes(map.boss.id)
  const enemies = bossAlive ? [...liveEnemies, { ...map.boss, isBoss: true }] : liveEnemies

  return { enemies, chests: gameState.mapChests[mapId] || [] }
}