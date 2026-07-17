import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useEffect, useState } from "react"
import { EnemyTypes } from "../game/enemyTypes.js"
import { useCombat } from "../hooks/useCombat.js"
import { useHero } from "../hooks/useHero.js"
import { BossTypes } from "../game/bossTypes.js"
import { useItems } from "../hooks/useItems.js"
import { ItemTypes } from "../game/itemTypes.js"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function BattleScreen({ enemy }) {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()
  const { hero, updateHero, effectiveStats } = useHero()
  const { inventory, removeItem } = useItems()
  const [showItems, setShowItems] = useState(false)

  const heroStats = effectiveStats()
  const enemyStats = enemy.isBoss ? BossTypes[enemy.type] : EnemyTypes[enemy.type]

  const handleWin = (finalPlayerHp) => {
    updateHero({ health: finalPlayerHp})  
    if (enemy.isBoss){
      updateGameState({ defeatedBosses: [...gameState.defeatedBosses, enemy.id] })
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

  const { playerHp, enemyHp, log, attack, defend, useItemInBattle } = useCombat(
    enemy, enemyStats, 
    { health: hero.health, maxHealth: hero.maxHealth, ...heroStats }, 
    handleWin, handleLose
  )

  const handleUseItem = (itemId) => {
    const item = ItemTypes[itemid]
    useItemInBattle(item)
    removeItem(itemId)
    setShowItems(false)
  }

  const consumables = inventory.filter(id => ItemTypes[id].type === "consumable")
  const battleOver = playerHp <= 0 || enemyHp <= 0

  return (
    <CenterDiv>
      <h1>{enemy.isBoss ? "BOSS BATTLE" : "BATTLE"} - {enemyStats.name}</h1>
      <p>You: {playerHp}  HP</p>
      <p>{enemyStats.name}: {enemyHp} HP</p>
      <p>{log}</p>

      {!battleOver && !showItems && (
        <>
          <button onClick={attack}>Attack</button>
          <button onClick={defend}>Defend</button>
          <button onClick={() => setShowItems(true)}>Item</button>
          <button disabled title="W.I.P">Skills</button>
        </>
      )}

      {!battleOver&& showItems && (
        <div>
          {consumables.length === 0 && <p>No usable items.</p>}
          {consumables.map((itemId, i) => (
            <button key={itemId + i} onClick={() => handleUseItem(itemId)}>
              {ItemTypes[itemId].name}
            </button>
          ))}
          <button onClick={() => setShowItems(false)}>Back</button>
        </div>
      )}
    </CenterDiv>
  )
}