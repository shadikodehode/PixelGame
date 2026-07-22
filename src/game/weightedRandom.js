export function pickWeighted(pool) {
  const totalWeight = pool.reduce((sum, entry) => sum + entry.weight, 0)
  if (totalWeight <= 0) return null

  let roll = Math.random() * totalWeight
  for (const entry of pool){
    roll -= entry.weight
    if (roll <= 0) return entry.id
  }
  return pool[pool.length - 1].id
}