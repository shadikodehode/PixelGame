import { useGameState } from "../context/GameStateContext.jsx"
import { ItemTypes } from "../game/itemTypes.js"

export function useHero() {
  const { gameState, updateGameState } = useGameState()

  const updateHero = (partial) => {
    updateGameState({ hero: { ...gameState.hero, ...partial } })
  }

  const heal = (amount) => {
    const newHealth = Math.min(gameState.hero.maxHealth, gameState.hero.health + amount)
    updateHero({ health: newHealth })
  }

  const fullHeal = () => {
    updateHero({ health: gameState.hero.maxHealth })
  }

  const effectiveStats = () => {
    const hero = gameState.hero
    const weapon = hero.equippedWeapon ? ItemTypes[hero.equippedWeapon] : null
    const armor = hero.equippedArmor ? ItemTypes[hero.equippedArmor] : null
    return {
      strength: hero.baseStrength + (weapon?.strengthBonus || 0),
      defense: hero.baseDefense + (armor?.defenseBonus || 0),
    }
  }

  return { hero: gameState.hero, updateHero, heal, fullHeal, effectiveStats }
}