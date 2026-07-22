import { Armor } from "./items/armor"
import { Consumables } from "./items/consumables"
import { Weapons } from "./items/weapons"
import { pickWeighted } from "./weightedRandom"

const allItems = { ...Weapons, ...Armor, ...Consumables }

const lootPool = Object.values(allItems).map((item) =>({
  id: item.id,
  weight: item.dropWeight ?? 1,
}))

export function rollLoot({ minGold  = 5, maxGold = 20, itemChance = 0.3 } = {}) {
  const gold = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold
  const item = Math.random() < itemChance ? pickWeighted(lootPool) : null
  return { gold, item }
}