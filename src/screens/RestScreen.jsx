import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useHero } from "../hooks/useHero.js"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function RestScreen() {
  const { goTo } = useGame()
  const { hero, fullHeal } = useHero() 

  return (
    <CenterDiv>
      <h1>REST</h1>
      <p>HP: {hero.health} / {hero.maxHealth}</p>
      {hero.health < hero.maxHealth && (
        <button onClick={fullHeal}>Rest (full heal)</button>
      )}
      <button onClick={() => goTo("dungeon")}>Back to dungeon</button>
    </CenterDiv>
  )
}