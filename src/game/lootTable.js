import { Armor } from "./items/armor"
import { Consumables } from "./items/consumables"
import { Weapons } from "./items/weapons"
import { pickWeighted } from "./weightedRandom"

const allItems = { ...Weapons, ...Armor, ...Consumables }

const lootPool = Object.values(allItems).map((item) =>({
  id: item.id,
  weight: item.dropWeight ?? 1,
}))

export function rollChestLoot() {
  const gold = Math.floor(Math.random() * 15) + 5
  const itemChance= Math.random()
  const item = itemChance < 0.3 ? pickWeighted(lootPool) : null
  return { gold, item }
}