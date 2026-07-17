const CRIT_CHANCE = 0.15
const CRIT_MULTIPLIER = 1.5
const VARIANCE = 0.2
export const DEFEND_REDUCTION = 0.5

export function calculateDamage(attackerStrength, defenderDefense) {
  const base = Math.max(1, attackerStrength - defenderDefense)
  const swing = base * VARIANCE
  const randomized = base + (Math.random() * swing * 2 - swing)
  const isCrit = Math.random() < CRIT_CHANCE
  const damage = Math.max(1, Math.round(isCrit ? randomized * CRIT_MULTIPLIER : randomized))
  return { damage, isCrit }
}

export function isDefeated(hp) {
  return hp <= 0
}