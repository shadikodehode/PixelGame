import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useHero } from "../hooks/useHero.js"

export default function RestScreen() {
  const { goTo } = useGame()
  const { hero, fullHeal } = useHero() 

  return (
    <div className="flex flex-col gap-4">
      <h1>REST</h1>
      <p>HP: {hero.health} / {hero.maxHealth}</p>
      {hero.health < hero.maxHealth && (
        <button onClick={fullHeal}>Rest (full heal)</button>
      )}
      <button onClick={() => goTo("dungeon")}>Back to dungeon</button>
    </div>
  )
}