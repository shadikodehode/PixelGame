import { useGameState } from "../context/GameStateContext.jsx"
import { useHero } from "./useHero.js"
import { ItemTypes } from "../game/itemTypes.js"

export function useItems() {
  const { gameState, updateGameState } = useGameState()
  const { heal, updateHero } = useHero()

  const addItem = (itemId) => {
    const item = ItemTypes[itemId]
    const alreadyOwned = item.type !== "consumable" && gameState.inventory.includes(itemId)
    if (alreadyOwned) return
    updateGameState({ inventory: [...gameState.inventory, itemId] })
  }

  const equip = (itemId) => {
    const item = ItemTypes[itemId]
    if (item.type === "weapon") updateHero({ equippedWeapon: itemId })
    if (item.type === "armor") updateHero({ equippedArmor: itemId })
  }

  const unequip = (slot) => {
    if(slot ==="weapon") updateHero({ equippedWeapon: null })
    if(slot ==="armor") updateHero({ equippedarmor: null })      
  }

  const useItem = (itemid) => {
    const item = ItemTypes[itemId]
    if (item.type !=="consumable") return
    
    if  (item.healAmount)heal(item.healAmount)
    
    const index = gameState.inventory.indexOf(itemId)
    const newInventory = [...gameState.inventory]
    newInventory.splice(index, 1)
    updateGameState({ inventory: newInventory })
  }

  return { inventory: gameState.inventory, addItem, equip, unequip, useItem }
}