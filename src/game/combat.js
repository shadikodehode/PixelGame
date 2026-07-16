export function calculateDamage(attackerStrength, defenderDefense) {
  return Math.max(1, attackerStrength - defenderDefense)
}

export function isDefeated(hp) {
  return hp <= 0
}