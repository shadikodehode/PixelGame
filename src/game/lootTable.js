export function rollChestLoot() {
  const gold = Math.floor(Math.random() * 15) + 5
  const itemChance= Math.random()
  const item = itemChance < 0.3 ? "rustySword" : null
  return { gold, item }
}