import { useGameState } from "../context/GameStateContext.jsx"

export function useHero() {
  const { gameState, updateGameState } = useGameState()

  const updateHero = (partial) => {
    updateGameState({ hero: { ...gameState.hero, ...partial } })
  }

  const heal = (amount) => {
    const newHealth = Math.min(gameState.hero.MaxHealth, gameState.hero.health + amount)
    updateHero({ health: newHealth })
  }

  const fullHeal = () => {
    updateHero({ health: gameState.hero.MaxHealth })
  }

  return { hero: gameState.hero, updateHero, heal, fullHeal }
}