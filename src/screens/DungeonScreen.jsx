import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"

export default function DungeonScreen() {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()

  const handleExit = (exit) => {
    updateGameState({
      currentMap: exit.targetMap,
      playerPosition: exit.entryPoint,
    })
  }

  const handleChestContact = (chest) => {
    updateGameState({
      openedChests: [...gameState.openedChests, chest.id],
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <GameCanvas 
        mapId={gameState.currentMap}
        onEnemyContact={(enemy) => goTo("battle", { enemy })}
        onExit={handleExit}
        onChestContact={handleChestContact}
      />
      <button onClick={() => goTo("rest")}>Rest</button>
      <button onClick={() => goTo("menu")}>Menu</button>
    </div>
  )
}