import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"

export default function RestScreen() {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()

  const handleRest = () => {
    updateGameState({
      hero: { ...gameState.hero, health: gameState.hero.maxHealth },
    })
  }

  const isFullHealth = gameState.hero.health >= gameState.hero.maxHealth

  return (
    <div>
      <h1>REST</h1>
      <p>HP: {gameState.hero.health} / {gameState.hero.maxHealth}</p>
      {!isFullHealth && (
        <button onClick={handleRest}>Rest (full heal)</button>
      )}
      <button onClick={() => goTo("dungeon")}>Back to dungeon</button>
    </div>
  )
}