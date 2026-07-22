import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useState } from "react"
import { useCombat } from "../hooks/useCombat.js"
import { useHero } from "../hooks/useHero.js"
import { useCurrency } from "../hooks/useCurrency.js"
import { getCombatantStats } from "../game/getCombatantStats.js"
import { useItems } from "../hooks/useItems.js"
import { ItemTypes } from "../game/itemTypes.js"
import { rollLoot } from "../game/lootTable.js"
import { maps } from "../game/maps/index.js"
import Modal from "../components/Modal.jsx"
import MenuButton from "../components/MenuButton.jsx"
import { menuStyles } from "../styles/menuStyles.js"

export default function BattleScreen({ enemy }) {
  const { goTo } = useGame()
  const { gameState, updateGameState } = useGameState()
  const { hero, updateHero, effectiveStats } = useHero()
  const { addGold } = useCurrency()
  const { inventory, addItem, removeItem } = useItems()
  const [showItems, setShowItems] = useState(false)
  const [victoryName, setVictoryName] = useState(null)

  const heroStats = effectiveStats()
  const enemyStats = getCombatantStats(enemy)
  const map = maps[gameState.currentMap]

  const handleWin = (finalPlayerHp) => {
    updateHero({ health: finalPlayerHp})  

    const { gold: goldFound, item } = rollLoot(
      map.lootPool,
      enemy.isBoss
      ? { minGold: 50, maxGold: 100, itemChance: 1 }
      : { minGold: 5, maxGold: 15,itemChance : 0.25 }
    )
    addGold(goldFound)
    if (item) addItem(item)

    if (enemy.isBoss){
      updateGameState({ defeatedBosses: [...gameState.defeatedBosses, enemy.id] })
      if (enemyStats.isFinal) {
        setVictoryName(enemyStats.name)
      } else {
        setTimeout(() => goTo("dungeon"), 1000)
      }
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
    const item = ItemTypes[itemId]
    useItemInBattle(item)
    removeItem(itemId)
    setShowItems(false)
  }

  const consumables = inventory.filter(id => ItemTypes[id].type === "consumable")
  const battleOver = playerHp <= 0 || enemyHp <= 0

  return (
    <>
      <h1>{enemy.isBoss ? "BOSS BATTLE" : "BATTLE"} - {enemyStats.name}</h1>
      <p>You: {playerHp} HP</p>
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

      {victoryName && (
        <Modal>
          <h2 className={menuStyles.headerStyle}>VICTORY</h2>
          <p>You defeated {victoryName}!</p>
          <MenuButton onClick={() => goTo("menu")}>Return to Menu</MenuButton>
        </Modal>
      )}
    </>
  )
}