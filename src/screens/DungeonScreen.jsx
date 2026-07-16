import { useEffect } from "react"
import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useCurrency } from "../hooks/useCurrency.js"
import { commonStyles } from "../styles/commonStyles.js"
import { ObjectTypes } from "../game/objectTypes.js"
import { maps } from "../game/maps/index.js"
import { generateChests, generateEnemies } from "../game/floorGenerator.js"

export default function DungeonScreen() {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()
  const { gold, addGold } = useCurrency()

  const center = commonStyles.center

  const mapId = gameState.currentMap
  const map = maps[mapId]

  useEffect(() => {
    const updates = {}
    if (!gameState.mapChests[mapId]) {
      updates.mapChests = { ...gameState.mapChests, [mapId]: generateChests(map, map.chestCount)}
    }
    if (!gameState.mapEnemies[mapId]) {
      updates.mapEnemies = { ... gameState.mapEnemies, [mapId]: generateEnemies(map, map.enemySpawns.pool, map.enemySpawns.count)}
    }
    if (Object.keys(updates).length > 0) updateGameState(updates)
  }, [mapId])

  const handleExit = (exit) => {
    const targetMap = maps[exit.targetMap]
    updateGameState({
      currentMap: exit.targetMap,
      playerPosition: exit.entryPoint,
      defeatedEnemies: [],
      mapEnemies: {
        ...gameState.mapEnemies,
        [exit.targetMap]: generateEnemies(targetMap, targetMap.enemySpawns.pool, targetMap.enemySpawns.count),
      },
    })
  }

  const handleChestContact = (chest) => {
    addGold(ObjectTypes.chest.goldReward)
    updateGameState({
      openedChests: [...gameState.openedChests, chest.id],
    })
  }

  return (
    <div className={`${center}`}>
      <p>Gold: {gold} </p>
      <GameCanvas 
        mapId={mapId}
        enemies={gameState.mapEnemies[mapId] || []}
        chests={gameState.mapChests[mapId] || []}
        onEnemyContact={(enemy) => goTo("battle", { enemy })}
        onExit={handleExit}
        onChestContact={handleChestContact}
      />
      <button onClick={() => goTo("rest")}>Rest</button>
      <button onClick={() => goTo("menu")}>Menu</button>
    </div>
  )
}