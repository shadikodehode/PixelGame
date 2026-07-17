import { useGameState } from "../context/GameStateContext.jsx"
import { useHero } from "./useHero.js"
import { ItemTypes } from "../game/itemTypes.js"

export function useItems() {
  const { gameState, updateGameState } = useGameState()
  const { updateHero } = useHero()

  const addItem = (itemId) => {
    updateGameState({ inventory:[...gameState.inventory, itemId] })
  }

  const equip = (itemId) => {
    const item = ItemTypes[itemId]
    if (item.type === "weapon") updateHero({ equippedWeapon: itemId })
      if (item.type === "armor") updateHero({ equippedArmor: itemId })
  }

  return { inventory: gameState.inventory, addItem, equip }
}