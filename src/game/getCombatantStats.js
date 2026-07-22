import { BossTypes } from "./bossTypes";
import { EnemyTypes } from "./enemyTypes";

export  function getCombatantStats(entity) {
  const stats = entity.isBoss ? BossTypes[entity.type] : EnemyTypes[entity.type]
  if (!stats) {
    throw new Error(`Unknown ${entity.isBoss ? "boss" : "enemy"} type: "${entity.type}"`)
  }
  return stats
}