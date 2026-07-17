import { useState, useEffect } from "react"
import { calculateDamage, isDefeated, DEFEND_REDUCTION } from "../game/combat.js"

export function useCombat(enemy, enemyStats, hero, onWin, onLose) {
  const [playerHp, setPlayerHp] = useState(hero.health)
  const [enemyHp, setEnemyHp] = useState(enemyStats.health)
  const [log, setLog] = useState(`A wild ${enemyStats.name} appears!`)

  useEffect(() => {
    if (isDefeated(enemyHp)) onWin(playerHp)
    if (isDefeated(playerHp)) onLose()
  }, [playerHp, enemyHp])

  const enemyTurn = (defending) => {
    const { damage, isCrit } = calculateDamage(enemyStats.strength, hero.defense)
    const finalDamage = defending ? Math.round(damage * DEFEND_REDUCTION) : damage
    setPlayerHp((hp) => Math.max(0, hp - finalDamage))
    return { finalDamage, isCrit }
  }

  const attack = () => {
  const { damage: damageToEnemy, isCrit: playerCrit } = calculateDamage(hero.strength, enemyStats.defense)
  const newEnemyHp = Math.max(0, enemyHp - damageToEnemy)
  setEnemyHp(newEnemyHp)

  if (!isDefeated(newEnemyHp)) {
    const { damage: damageToPlayer, isCrit: enemyCrit } = calculateDamage(enemyStats.strength, hero.defense)
    setPlayerHp((hp) => Math.max(0, hp - damageToPlayer))
    setLog(
      `You hit for ${damageToEnemy}. ${enemyStats.name} hits back for ${damageToPlayer}.`
    )
  } else {
    setLog(`${enemyStats.name} defeated! ${playerCrit ? "Critical hit!"  : ""}`)
  }
}

const defend = () => {
  const { finalDamage, isCrit } = enemyTurn(true)
  setLog(`You brace for impact, ${enemyStats.name}hits for ${finalDamage}${isCrit? "(CRIT!)" : ""} (reduced).`)
}

const useItemInBattle = (item) => {
  if (item.healAmount) {
    setPlayerHp((hp) => Math.min(hero.maxHealth, hp + item.healAmount))
  }
  const { finalDamage, isCrit } = enemyTurn(false)
  setLog(`You use ${item.name}. ${enemyStats.name} hits for ${finalDamage}${isCrit ? "(CRIT!)" : ""}.`)
}

return { playerHp, enemyHp, log, attack, defend, useItemInBattle }
}