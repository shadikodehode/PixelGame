import { useGameState } from "../context/GameStateContext.jsx"
import { maps } from "../game/maps/index.js"
import { generateFloorEntities } from "../game/floorGenerator.js"

export function useMapTransition() {
  const { updateGameState } = useGameState()

  const travelTo = (exit) => {
    const targetMap = maps[exit.targetMap]
    const { enemies } = generateFloorEntities(targetMap)
    updateGameState({
      currentMap: exit.targetMap,
      playerPosition: exit.entryPoint,
      defeatedEnemies: [],
      mapEnemies: { [exit.targetMap]: enemies },
    })
  }

  return { travelTo }
}