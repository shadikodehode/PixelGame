import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { commonStyles } from "../styles/commonStyles.js"

export default function DungeonScreen() {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()

  const center = commonStyles.center

  const handleExit = (exit) => {
    updateGameState({
      currentMap: exit.targetMap,
      playerPosition: exit.entryPoint,
      defeatedEnemies: [],
    })
  }

  const handleChestContact = (chest) => {
    updateGameState({
      openedChests: [...gameState.openedChests, chest.id],
    })
  }

  return (
    <div className={`${center}`}>
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