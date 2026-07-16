import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useEffect, useState } from "react"
import { EnemyTypes } from "../game/enemyTypes.js"
import { useCombat } from "../hooks/useCombat.js"

export default function BattleScreen({ enemy }) {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()
  const enemyStats = EnemyTypes[enemy.type]

  const handleWin = (finalPlayerHp) => {
    updateGameState({
      hero: { ...gameState.hero, health: finalPlayerHp },
      defeatedEnemies: [...gameState.defeatedEnemies, enemy.id]
    })
    setTimeout(() => goTo("dungeon"), 1000)
  }

  const handleLose = ()  => {
    updateGameState({ hero: { ...gameState.hero, health: 0  } })
    setTimeout(() => goTo("gameover"), 1000)
  }

  const { playerHp, enemyHp, log, attack } = useCombat(
    enemy, enemyStats, gameState.hero, handleWin, handleLose
  )

  return (
    <div>
      <h1>BATTLE - {enemyStats.name}</h1>
      <p>You: {playerHp}  HP</p>
      <p>{enemyStats.name}: {enemyHp} HP</p>
      <p>{log}</p>
      {playerHp > 0 && enemyHp > 0 && (
        <button onClick={attack}>Attack</button>
      )}
    </div>
  )
}