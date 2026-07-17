import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useEffect, useState } from "react"
import { EnemyTypes } from "../game/enemyTypes.js"
import { useCombat } from "../hooks/useCombat.js"
import { useHero } from "../hooks/useHero.js"
import { commonStyles } from "../styles/commonStyles.js"
import { BossTypes } from "../game/bossTypes.js"

export default function BattleScreen({ enemy }) {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()
  const { hero, updateHero} = useHero()

  const enemyStats = enemy.isBoss ? BossTypes[enemy.type] : EnemyTypes[enemy.type]

  const center = commonStyles.center

  const handleWin = (finalPlayerHp) => {
    updateHero({ health: finalPlayerHp})

    if (enemy.isBoss){
      updateGameState({ defeatedEnemies: [...gameState.defeatedEnemies, enemy.id] })
      setTimeout(() => goTo(enemyStats.isFinal ? "victory" : "dungeon"), 1000)
    } else {
      updateGameState({ defeatedEnemies: [...gameState.defeatedEnemies, enemy.id] })
      setTimeout(() => goTo("dungeon"), 1000)
    }
    }
    
  const handleLose = ()  => {
    updateHero({ health: 0 })
    setTimeout(() => goTo("gameover"), 1000)
  }

  const { playerHp, enemyHp, log, attack } = useCombat(
    enemy, enemyStats, gameState.hero, handleWin, handleLose
  )

  return (
    <div className={`${center}`}>
      <h1>{enemy.isBoss ? "BOSS BATTLE" : "BATTLE"} - {enemyStats.name}</h1>
      <p>You: {playerHp}  HP</p>
      <p>{enemyStats.name}: {enemyHp} HP</p>
      <p>{log}</p>
      {playerHp > 0 && enemyHp > 0 && (
        <button onClick={attack}>Attack</button>
      )}
    </div>
  )
}