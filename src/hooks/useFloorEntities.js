import { useEffect } from "react"
import { useGameState } from "../context/GameStateContext.jsx"
import { generateFloorEntities } from "../game/floorGenerator.js"

export function useFloorEntities(mapId, map) {
  const { gameState, updateGameState } = useGameState()

  useEffect(() => {
    if (!gameState.mapChests[mapId] || !gameState.mapEnemies[mapId]) {
      const { chests, enemies } = generateFloorEntities(map)
      updateGameState({
        mapChests: { [mapId]: chests },
        mapEnemies:{ [mapId]: enemies },
      })
    }
  }, [mapId])

  const liveEnemies = (gameState.mapEnemies[mapId] || [])
  .filter(e => !gameState.defeatedEnemies.includes(e.id))

  const bossAlive = map.boss && !gameState.defeatedBosses.includes(map.boss.id)
  const enemies = bossAlive ? [...liveEnemies, { ...map.boss, isBoss: true }] : liveEnemies

  return { enemies, chests: gameState.mapChests[mapId] || [] }
}