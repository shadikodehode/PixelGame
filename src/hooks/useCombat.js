import { useState, useEffect } from "react"
import { calculateDamage, isDefeated } from "../game/combat"

export function useCombat(enemy, enemyStats, hero, onWin, onLose) {
  const [playerHp, setPlayerHp] = useState(hero.health)
  const [enemyHp, setEnemyHp] = useState(enemyStats.health)
  const [log, setLog] = useState(`A wild ${enemyStats.name} appears!`)

  useEffect(() => {
    if (isDefeated(enemyHp)) onWin(playerHp)
    if (isDefeated(playerHp)) onLose()
  }, [playerHp, enemyHp])

const attack = () => {
  const damageToEnemy = calculateDamage(hero.strength, enemyStats.defense)
  const newEnemyHp = Math.max(0, enemyHp - damageToEnemy)
  setEnemyHp(newEnemyHp)

  if (!isDefeated(newEnemyHp)) {
    const damageToPlayer = calculateDamage(enemyStats.strength, hero.defense)
    setPlayerHp((hp) => Math.max(0, hp - damageToPlayer))
    setLog(`You hit for ${damageToEnemy}. ${enemyStats.name} hits back for ${damageToPlayer}.`)
  } else {
    setLog(`${enemyStats.name} defeated!`)
  }
}

return { playerHp, enemyHp, log, attack }
}