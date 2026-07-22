import { ItemTypes } from "./itemTypes.js"
import { pickWeighted } from "./weightedRandom.js"

export function rollLoot(lootPool = [], { minGold = 5, maxGold = 20, itemChance = 0.3 } = {}) {
  const gold = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold
  const weighted = (lootPool ?? []).map((id) => ({ id, weight: ItemTypes[id]?.dropWeight ?? 1 }))
  const item = weighted.length && Math.random() < itemChance ? pickWeighted(weighted) : null
  return { gold, item }
}