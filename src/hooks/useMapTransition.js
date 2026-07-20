import { useGameState } from "../context/GameStateContext.jsx"

export function useMapTransition() {
  const { updateGameState } = useGameState()

  const travelTo = (exit) => {
    updateGameState({
      currentMap: exit.targetMap,
      playerPosition: exit.entryPoint,
      defeatedEnemies: [],
    })
  }

  return { travelTo }
}